import Post from '../models/Post.js'
import User from '../models/User.js'

export async function getPost (req, res) {
  const { id } = req.params

  try {
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.status(200).json({ post })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getFeedPosts (req, res) {
  const userId = req.user._id

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const following = user.following

    const feedPosts = await Post.find({ author: { $in: following } }).sort({ createdAt: -1 })

    res.status(200).json(feedPosts)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getUserPosts (req, res) {
  const { username } = req.params
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 })

    res.status(200).json(posts)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function newPost (req, res) {
  const { author, content, img } = req.body
  const userId = req.user._id

  try {
    if (!author || !content) {
      return res.status(400).json({ error: 'Author and content are required' })
    }

    const user = await User.findById(author)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user._id.toString() !== userId.toString()) {
      return res.status(401).json({ error: 'Unauthorized to create post' })
    }

    const maxLength = 500
    if (content.length > maxLength) {
      return res.status(400).json({ error: `Text must be less than ${maxLength} characters` })
    }

    const newPost = new Post({ author, content, img })
    await newPost.save()
    res.status(201).json({ message: 'Post created successfully', newPost })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updatePost (req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.json(updatedPost)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function deletePost (req, res) {
  const userId = req.user._id
  const { id } = req.params

  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    if (post.author.toString() !== userId.toString()) {
      return res.status(401).json({ error: 'Unauthorized to delete post' })
    }
    await Post.findByIdAndDelete(id)
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function favUnfavPost (req, res) {
  const postId = req.params.id
  const userId = req.user._id

  try {
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const userLikedPost = post.favorites.includes(userId)

    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { favorites: userId } })
      res.status(200).json({ message: 'Post unfavorited successfully' })
    } else {
      post.favorites.push(userId)
      await post.save()
      res.status(200).json({ message: 'Post favorited successfully' })
    }
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function replyToPost (req, res) {
  const { _id: userId, profilePic: userProfilePic, username } = req.user
  const postId = req.params.id
  const { text } = req.body

  try {
    if (!text) {
      return res.status(400).json({ error: 'Text field is required' })
    }

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const reply = { userId, text, userProfilePic, username }

    post.replies.push(reply)
    await post.save()

    res.status(201).json({ message: 'Reply added successfully', post })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
