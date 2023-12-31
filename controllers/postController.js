const Post = require("../models/PostModel")
const fs = require('fs')

const getAllPosts = async (req,res) => {
  try {
    const posts = await Post.findAll()
    console.log(req.protocol, req.hostname, process.env.PORT);
    posts.forEach(post => {
      post.image = `${req.protocol}://${req.hostname}:${process.env.PORT}${post.image}`
    })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getPost = async (req,res) => {
  try {
    const {id} = req.params
    const post = await Post.findByPk(id)
    post.image = `${req.protocol}://${req.hostname}:${process.env.PORT}${post.image}`
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const createPost = async (req,res) => {
  console.log(req.body, req.file);
  try {
    const {title, body} = req.body
    let image = req.file.path.replace('public', '')
    image = image.replace(/\\/g, '/')
    const post = await Post.create({
      title: title,
      body: body,
      image: image
    })
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const updatePost = async (req,res) => {
  try {
    const {id} = req.params
    const post = await Post.findByPk(id)

    let data = req.body

    if (req.file) {
      let image = req.file.path.replace('public', '')
      image = image.replace(/\\/g, '/')
      data = {...data, image: image}

      if (fs.existsSync('public' + post.image)) {
        fs.unlink('public' + post.image, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }
    }
    post.update(data)
    res.json(post)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const deletePost = async (req,res) => {
  try {
    const {id} = req.params
    const post = await Post.findByPk(id)
    post.destroy()
    res.json({msg: 'Post eliminado correctamente'})
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}