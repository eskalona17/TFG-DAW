import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS)

    const user = await User.findById(decoded.userId).select('-password')

    req.user = user

    next()
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default protectRoute
