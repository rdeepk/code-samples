import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isPostOwner } from './authorization'
import pubsub, { EVENTS } from '../subscription'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    posts: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {}

      const posts = await models.Post.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      })

      const hasNextPage = posts.length > limit;
      const edges = hasNextPage ? posts.slice(0, -1) : posts

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    post: async (parent, { id }, { models }) => await models.Post.findByPk(id),
  },

  Mutation: {
      createPost: combineResolvers(
        isAuthenticated,
        async (parent, { title, body }, { me, models }) => {
          const post = await models.Post.create({ title, body, userId: me.id})
          pubsub.publish(EVENTS.POST.CREATED, {
            postCreated: { post },
          })

          return post
        },
      ),
      deletePost: combineResolvers(
        isAuthenticated,
        isPostOwner,
        async (parent, { id }, { models }) => await models.Post.destroy({ where: { id }})
      ),
      updatePost: async (parent, { id, title, body }, { models }) => {
        const [ updatedRow ] = await models.Post.update({ title, body }, { returning: true, where: { id } })
        return !!updatedRow
      }
  },

  Post: {
    user: async (post, args, { models }) => await models.User.findByPk(post.userId),
    comments: async (post, args, { models }) => await models.Comment.findAll({
      where: {
        postId: post.id
      }
    }),
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.POST.CREATED),
    },
  },
};
