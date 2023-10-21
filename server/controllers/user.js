import {
  validateAddress,
  validateEmail,
  validatePassword,
  validateText
} from '../utils/validator.js'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'
import User from '../models/User.js'
import Post from '../models/Post.js'
import bcrypt from 'bcryptjs'

export async function register (req, res) {
  const data = req.body
  const { name, username, email, password, confirmPassword, profile, address } =
    data

  try {
    await validateText(name)
    await validateText(username)
    await validateEmail(email)
    await validatePassword(password)
    await validatePassword(confirmPassword)

    if (address) {
      await validateAddress(address)
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] })
    if (userExists) {
      return res.status(409).json({ error: 'User already exists' })
    }

    if (profile === 'profesional' && !address) {
      throw new Error('Address is required for professional profiles')
    }
    const hashedPwd = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPwd,
      profile,
      address
    })

    await newUser.save()

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res)
      res
        .status(201)
        .json({ success: true, message: 'User registered successfully', newUser })
    }
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function login (req, res) {
  try {
    const { input, password } = req.body

    if (!input) {
      return res.status(400).json({ error: 'Email or username is required' })
    }

    const user = await User.findOne({
      $or: [{ username: input }, { email: input }]
    })

    const isPasswordCorrect = user !== null && bcrypt.compareSync(password, user.password)

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'invalid username or password' })
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      profile: user.profile
    })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function logout (req, res) {
  try {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function followUnfollow (req, res) {
  try {
    const { id } = req.params
    const userToModify = await User.findById(id)
    const currentUser = await User.findById(req.user._id)

    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: 'You cannot follow yourself' })
    }

    if (!userToModify || !currentUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    const isFollowing = currentUser.following.includes(id)

    if (isFollowing) {
      // Unfollow User
      await User.findByIdAndUpdate(id, { $pull: { following: id } })
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      res.status(200).json({ success: true, message: 'User unfollowed successfully' })
    } else {
      // Follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      res.status(200).json({ success: true, message: 'User followed successfully' })
    }
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateProfile (req, res) {
  const { id } = req.params
  const userId = req.user._id
  const { name, username, email, password, newPassword, confirmNewPassword, profilePic, profile, address } = req.body

  try {
    if (name) await validateText(name)
    if (username) await validateText(username)
    if (email) await validateEmail(email)
    if (password) await validatePassword(password)
    if (newPassword) await validatePassword(newPassword)
    if (confirmNewPassword) await validatePassword(confirmNewPassword)
    if (address) await validateAddress(address)

    let user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (id !== userId.toString()) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (password && (!newPassword || !confirmNewPassword)) {
      return res.status(400).json({ message: 'Password is required' })
    }

    if (password && newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'New passwords do not match' })
    }

    if (password && (newPassword === confirmNewPassword)) {
      const isCurrentPasswordCorrect = bcrypt.compareSync(password, user.password)

      if (!isCurrentPasswordCorrect) {
        return res.status(400).json({ message: 'Current password is incorrect' })
      }

      const hashedPwd = await bcrypt.hash(newPassword, 10)
      user.password = hashedPwd
    }

    if (profile === 'profesional' && !address) {
      return res.status(400).json({ message: 'Address is required for professional profiles' })
    }

    user.name = name ?? user.name
    user.username = username ?? user.username
    user.email = email ?? user.email
    user.profile = profile ?? user.profile
    user.profilePic = profilePic ?? user.profilePic
    user.address = address ?? user.address

    user = await user.save()

    res
      .status(200)
      .json({ success: true, message: 'User profile updated successfully', user })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getUserProfile (req, res) {
  const { username } = req.params
  try {
    const user = await User.findOne({ username }).select('-password').select('-updatedAt')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function remove (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    if (id !== userId.toString()) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const removedUser = await User.findByIdAndRemove(id)

    if (!removedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res
      .status(200)
      .json({ success: true, message: 'User removed successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function searchUsers (req, res) {
  const query = req.query.q
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } }, // search for username
        { name: { $regex: query, $options: 'i' } } // search for name
      ]
    })

    // get all the posts for that specific user
    const usersWithPosts = await Promise.all(
      users.map(async (user) => {
        const posts = await Post.find({ author: user._id })
        return { user, posts }
      })
    )

    res.status(200).json(usersWithPosts)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
