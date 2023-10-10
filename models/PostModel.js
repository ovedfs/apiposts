const connect = require('../database/connection')
const {DataTypes} = require('sequelize')

const Post = connect.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
});

(async() => await Post.sync({forced: true}))()

module.exports = Post
