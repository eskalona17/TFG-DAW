import Post from '../models/Post.js'
import User from '../models/User.js'
import multer from 'multer'
import { mediaUpload } from '../config/multerConfig.js'

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
  const profileType = req.body.profileType

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    let following = user.following

    if (profileType) {
      following = await User.find({ _id: { $in: following }, profile: profileType }).select('_id')
    }

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
  const { author, content } = req.body
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
    mediaUpload.single('media')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error en la carga de archivos de medios' })
      } else if (err) {
        return res.status(500).json({ message: 'Error interno del servidor' })
      }
    })

    const newPost = new Post({ author, content, media: req.file ? req.file.filename : null })
    await newPost.save()
    res.status(201).json({ message: 'Post created successfully', newPost })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updatePost (req, res) {
  const { content, media } = req.body
  const userId = req.user._id
  const { id } = req.params

  console.log(content)

  try {
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    if (post.author.toString() !== userId.toString()) {
      return res.status(401).json({ error: 'Unauthorized to update post' })
    }

    const maxLength = 500
    if (content.length > maxLength) {
      return res.status(400).json({ error: `Text must be less than ${maxLength} characters` })
    }

    mediaUpload.single('media')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error en la carga de archivos de medios' })
      } else if (err) {
        return res.status(500).json({ message: 'Error interno del servidor' })
      }
    })

    await Post.findByIdAndUpdate(id, { content, media: req.file ? req.file.filename : null })
    const updatedPost = await Post.findById(id)

    res.status(201).json({ message: 'Post updated successfully', updatedPost })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
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

export async function searchPosts (req, res) {
  const query = req.query.q
  try {
    // search for post content
    const posts = await Post.find({ $text: { $search: query } })

    if (!posts) {
      return res.status(404).json({ error: 'Post not found' })
    }

    // get all the user info for each post
    const postsWithUserInfo = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.author)
        return { post, user }
      })
    )

    res.status(200).json(postsWithUserInfo)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
