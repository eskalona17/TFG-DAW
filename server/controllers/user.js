import {
  validateAddress,
  validateEmail,
  validatePassword,
  validateText
} from '../utils/validator.js'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'
import emailTemplate from '../utils/emailTemplate.js'
import User from '../models/User.js'
import nodemailer from 'nodemailer'
import Post from '../models/Post.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import { profilePicUpload } from '../config/multerConfig.js'

export async function register (req, res) {
  const { name, username, email, password, confirmPassword, profile, address } = req.body

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

    profilePicUpload.single('profilePic')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error en la carga de la imagen de perfil' })
      } else if (err) {
        return res.status(500).json({ message: 'Error interno del servidor' })
      }
    })

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPwd,
      profile,
      address,
      profilePic: req.file ? req.file.filename : null
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

    // user can login with username or email
    const user = await User.findOne({
      $or: [{ username: input }, { email: input }]
    })

    const isPasswordCorrect =
      user !== null && bcrypt.compareSync(password, user.password)

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'invalid username or password' })
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).send(user)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function forgetPassword (req, res) {
  const BASEURL = process.env.BASEURL
  const PORT = process.env.PORT
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS, {
      expiresIn: '10m'
    })

    user.resetToken = token
    await user.save()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    })

    const info = {
      from: process.env.MAIL_USERNAME,
      to: user.email,
      subject: '¿Has olvidado tu contraseña?',
      text: `Restablecer contraseña: ${BASEURL}:${PORT}/reset-password/${token}`,
      html: emailTemplate({ link: `${BASEURL}:${PORT}/reset-password/${token}` })
    }

    await transporter.sendMail(info)
    console.log(`${BASEURL}:${PORT}/reset-password/${token}`)

    res
      .status(201)
      .json({
        message: 'A reset password link has been sent to your email',
        link: `${BASEURL}:${PORT}/reset-password/${token}`
      })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function resetPassword (req, res) {
  const { password, confirmPassword } = req.body
  const { token } = req.params

  try {
    await validatePassword(password)
    await validatePassword(confirmPassword)

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await User.findOne({ resetToken: token })

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    user.password = bcrypt.hashSync(password, 10)
    await user.save()

    res.send({ message: 'Password set successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function logout (req, res) {
  try {
    res.cookie('jwt', 'a', { maxAge: -1, path: '/', httpOnly: true, sameSite: 'strict' })
    res.status(200).json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getCurrentUser (req, res) {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
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
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      res
        .status(200)
        .json({ success: true, message: 'User unfollowed successfully' })
    } else {
      // Follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      res
        .status(200)
        .json({ success: true, message: 'User followed successfully' })
    }
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateProfile (req, res) {
  const { id } = req.params
  const userId = req.user._id
  const {
    name,
    username,
    email,
    password,
    newPassword,
    confirmNewPassword,
    profile,
    address
  } = req.body

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

    if (password && newPassword === confirmNewPassword) {
      const isCurrentPasswordCorrect = bcrypt.compareSync(
        password,
        user.password
      )

      if (!isCurrentPasswordCorrect) {
        return res
          .status(400)
          .json({ message: 'Current password is incorrect' })
      }

      const hashedPwd = await bcrypt.hash(newPassword, 10)
      user.password = hashedPwd
    }

    if (profile === 'profesional' && !address) {
      return res
        .status(400)
        .json({ message: 'Address is required for professional profiles' })
    }

    user.name = name ?? user.name
    user.username = username ?? user.username
    user.email = email ?? user.email
    user.profile = profile ?? user.profile
    user.address = address ?? user.address

    profilePicUpload.single('profilePic')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error en la carga de la imagen de perfil' })
      } else if (err) {
        return res.status(500).json({ message: 'Error interno del servidor' })
      }
      // Si la carga de la imagen es exitosa, actualiza la propiedad de la imagen de perfil
      user.profilePic = req.file ? req.file.filename : user.profilePic
    })

    user = await user.save()
    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      user

    })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getUserProfile (req, res) {
  const { username } = req.params
  try {
    const user = await User.findOne({ username })
      .select('-password')
      .select('-updatedAt')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function removeUser (req, res) {
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

    res.status(200).json({ success: true, message: 'User removed successfully' })
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

    if (!users) {
      return res.status(404).json({ message: 'User not found' })
    }

    // get all the posts for that specific user
    const usersWithPosts = await Promise.all(
      users.map(async (user) => {
        const posts = await Post.find({ author: user._id })
        return { user, posts }
      })
    )

    if (!usersWithPosts) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.status(200).json(usersWithPosts)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getSuggestedUsers (req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit)
  const skip = (page - 1) * limit

  try {
    const totalUsers = await User.countDocuments()

    if (skip >= totalUsers) {
      return res.status(200).json([])
    }

    const users = await User.find().skip(skip).limit(limit)

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' })
    }

    return res.status(200).json(users)
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
