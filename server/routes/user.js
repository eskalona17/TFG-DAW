import addUser from '../controllers/user.js'
import express from 'express'

const router = express.Router()

router.post('/new_user', addUser)

export default router
