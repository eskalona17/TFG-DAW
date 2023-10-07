import User from '../models/User.js'

const addUser = async (req, res) => {
  const { name, username, email, confirm_email, password, confirm_password, profile } = req.body

  if (password !== confirm_password) {
    res.status(400).json({ error: 'Passwords do not match' })
  }

  if (email !== confirm_email) {
    res.status(400).json({ error: 'Emails do not match' })
  }

  try {
    const user = new User({ name, username, email, password, profile })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'user already exist' })
  }
}

export default addUser
