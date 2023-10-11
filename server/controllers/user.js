import { validateAddress, validateEmail, validatePassword, validateText } from '../utils/validator.js'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function register (req, res) {
  const data = req.body
  const { name, username, email, confirmEmail, password, confirmPassword, profile, address } = data

  try {
    await validateText(name)
    await validateText(username)
    await validateEmail(email)
    await validateEmail(confirmEmail)
    await validatePassword(password)
    await validatePassword(confirmPassword)

    if (address) {
      await validateAddress(address)
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (email !== confirmEmail) {
      throw new Error('Emails do not match')
    }

    const existingUsernameUser = await User.findOne({ username }).lean().exec()
    if (existingUsernameUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const existingEmailUser = await User.findOne({ email }).lean().exec()
    if (existingEmailUser) {
      return res.status(409).json({ error: 'Email already exists' })
    }

    if (profile === 'profesional' && !address) {
      throw new Error('Address is required for professional profiles')
    }
    const hashedPwd = await bcrypt.hash(password, 10)

    const user = new User({
      name, username, email, password: hashedPwd, profile, address
    })

    await user.save()

    res.status(201).json({ success: true, message: 'User registered successfully' })
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

    let user = null

    user = await User.findOne({ username: input }).exec()

    if (!user) {
      user = await User.findOne({ email: input }).exec()
    }

    if (!user) {
      return res.status(400).json({ error: 'username or password incorrect' })
    }

    const isPasswordCorrect =
      user !== null && bcrypt.compareSync(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'username or password incorrect' })
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_ACCESS
    )

    res.status(200).json({
      id: user.id,
      username: user.username,
      name: user.name,
      profile: user.profile,
      accessToken
    })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateName (req, res) {
  const { id } = req.params
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  try {
    await validateText(name)
    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.name = name
    await user.save()

    res.status(200).json({ success: true, message: 'Name updated successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export async function updateUsername (req, res) {
  const { id } = req.params
  const { username } = req.body

  if (!username) {
    return res.status(400).json({ message: 'Name is required' })
  }

  try {
    await validateText(username)
    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.username = username
    await user.save()

    res.status(200).json({ success: true, message: 'Username updated successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export async function updateEmail (req, res) {
  const { id } = req.params
  const { email, confirmEmail } = req.body

  if (!email || !confirmEmail) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    await validateEmail(email)
    await validateEmail(confirmEmail)

    if (email !== confirmEmail) {
      throw new Error('Emails do not match')
    }

    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.email = email
    await user.save()

    res.status(200).json({ success: true, message: 'Email updated successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export async function updatePassword (req, res) {
  const { id } = req.params
  const { password, newPassword, confirmNewPassword } = req.body

  if (!password || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: 'Password is required' })
  }

  try {
    await validatePassword(password)
    await validatePassword(newPassword)
    await validatePassword(confirmNewPassword)

    if (newPassword !== confirmNewPassword) {
      throw new Error('New passwords do not match')
    }

    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isCurrentPasswordCorrect = bcrypt.compareSync(password, user.password)

    if (!isCurrentPasswordCorrect) {
      throw new Error('Current password is incorrect')
    }

    const hashedPwd = await bcrypt.hash(newPassword, 10)

    user.password = hashedPwd
    await user.save()

    res.status(200).json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export async function updateProfile (req, res) {
  const { id } = req.params
  const { profile, address } = req.body

  try {
    await validateText(profile)

    if (profile === 'profesional' && !address) {
      throw new Error('Address is required for professional profiles')
    }

    if (address) {
      await validateAddress(address)
    }

    const user = await User.findById(id).exec()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.profile = profile
    user.address = address
    await user.save()

    res.status(200).json({ success: true, message: 'User profile updated successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function remove (req, res) {
  const { id } = req.params

  try {
    const removedUser = await User.findByIdAndRemove(id).exec()

    if (!removedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ success: true, message: 'User removed successfully' })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
