import { login, register, updateProfile, removeUser, logout, followUnfollow, getUserProfile, searchUsers, forgetPassword, resetPassword, getSuggestedUsers, getCurrentUser, getUserById } from '../controllers/user.js'
import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'

const router = express.Router()

router.get('/suggested-users', protectRoute, getSuggestedUsers)
router.get('/search', protectRoute, searchUsers)
router.get('/profile/:username', protectRoute, getUserProfile)
router.get('/user', protectRoute, getCurrentUser)
router.get('/user-info/:userId', protectRoute, getUserById)
router.post('/register', register)
router.post('/login', login)
router.post('/forget-password', forgetPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/logout', logout)
router.post('/follow/:id', protectRoute, followUnfollow)
router.patch('/update/:id', protectRoute, updateProfile)
router.delete('/delete/:id', protectRoute, removeUser)

export default router
