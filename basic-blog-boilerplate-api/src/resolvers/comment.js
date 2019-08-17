export default {
  Query: {
    comments: async (parent, args, { models }) => await models.Comment.findAll(),
    comment: async (parent, { id }, { models }) => await models.Comment.findByPk(id)
  },

  Mutation: {
    createComment: async (parent, { postId, text }, { me, models }) =>  await models.Comment.create({ postId, text, userId: me.id}),
    deleteComment: async (parent, { id }, { models }) => await models.Comment.destroy({ where: { id }}),
    updateComment: async (parent, { id, text }, { models }) => {
      const [ updatedRow ] = await models.Comment.update({ text }, { returning: true, where: { id } })
      return !!updatedRow
    }
  },

  Comment: {
    user: async (comment, args, { models }) => await models.User.findByPk(comment.userId),
    post: async (comment, args, { models }) => await models.Post.findByPk(comment.postId)
  },
};
