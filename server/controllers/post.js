import Post from '../models/Post.js'

export async function getAllPosts (req, res) {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function newPost (req, res) {
  const post = new Post(req.body)
  try {
    const savedPost = await post.save()
    res.status(201).json(savedPost)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function getPost (req, res) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      // Si no se encuentra un post con el ID proporcionado, devolver un error 404
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updatePost (req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedPost)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function deletePost (req, res) {
  try {
    await Post.findByIdAndRemove(req.params.id)
    res.json({ message: 'Post deleted' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
