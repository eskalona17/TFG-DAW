import { validateAddress, validateEmail, validatePassword, validateText } from '../utils/validator.js'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function register (req, res) {
  const data = req.body
  const { name, username, email, confirmEmail, password, confirmPassword, profile, address } = data

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
  try {
    const hashedPwd = await bcrypt.hash(password, 10)

    const user = new User({
      name, username, email, password: hashedPwd, profile, address
    })

    await user.save()

    res.status(201).json({ success: true })
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
