const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Comment can not be empty"
        }
      }
    }
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.User)
    Comment.belongsTo(models.Post)
  }
  return Comment
}

export default comment
