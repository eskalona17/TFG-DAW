import { login, register, updateName, updateUsername, updateEmail, updatePassword, updateProfile, remove } from '../controllers/user.js'
import express from 'express'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/update_name/:id', updateName)
router.patch('/update_username/:id', updateUsername)
router.patch('/update_email/:id', updateEmail)
router.patch('/update_password/:id', updatePassword)
router.patch('/update_profile/:id', updateProfile)
router.delete('/delete/:id', remove)

export default router
