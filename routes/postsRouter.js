const express = require('express')
const { getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController')
const upload = require('../libs/upload')
const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPost)
router.post('/', upload.single('image'), createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router