import { login, register, updateProfile, removeUser, logout, followUnfollow, getUserProfile, searchUsers, forgetPassword, resetPassword } from '../controllers/user.js'
import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'

const router = express.Router()

router.get('/search', protectRoute, searchUsers)
router.get('/profile/:username', getUserProfile)
router.post('/register', register)
router.post('/login', login)
router.post('/forget-password', forgetPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/logout', logout)
router.post('/follow/:id', protectRoute, followUnfollow)
router.patch('/update/:id', protectRoute, updateProfile)
router.delete('/delete/:id', protectRoute, removeUser)

export default router
