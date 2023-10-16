import { login, register, updateProfile, remove, logout, followUnfollow } from '../controllers/user.js'
import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/follow/:id', protectRoute, followUnfollow)
router.patch('/update/:id', protectRoute, updateProfile)
router.delete('/delete/:id', protectRoute, remove)

export default router
