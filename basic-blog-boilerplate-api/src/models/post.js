const post = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Post title can not be empty."
        },
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Post body can not be empty."
        },
      }
    }
  })
  Post.associate = (models) => {
    Post.belongsTo(models.User)
  }
  return Post
}

export default post
