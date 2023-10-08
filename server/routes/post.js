const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// Ruta para obtener todos los posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ruta para crear un nuevo post
router.post('/posts', async (req, res) => {
  const post = new Post(req.body)
  try {
    const savedPost = await post.save()
    res.status(201).json(savedPost)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Ruta para actualizar un post
router.put('/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedPost)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Ruta para eliminar un post
router.delete('/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id)
    res.json({ message: 'Post deleted' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
