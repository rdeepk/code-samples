import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'
import { isAdmin } from './authorization'

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user
  return await jwt.sign({ id, email, username, role }, secret, { expiresIn })
}

export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.findAll(),
    user: async (parent, { id }, { models }) =>  await models.User.findByPk(id),
    me: async (parent, args, { me }) => await models.User.findByPk(me.id),
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      })

      return { token: createToken(user, secret, '30m') }
    },

    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '30m') };
    },
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      },
    ),
    updateUser: async (parent, { id, username, firstName, lastName }, { models }) => {
      const [ updatedRow ] = await models.User.update({ username, firstName, lastName }, { returning: true, where: { id } })
        return !!updatedRow
    }
  },

  User: {
    posts: async (user, args, { models }) => models.Post.findAll({
      where: {
        userId: user.id
      }
    }),
    comments: async (user, args, { models }) => models.Comment.findAll({
      where: {
        userId: user.id
      }
    }),
  },
};
