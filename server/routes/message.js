import { getConversations, getMessages, sendMessage } from '../controllers/message.js'
import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'

const router = express.Router()

router.get('/conversations', protectRoute, getConversations)
router.get('/:otherUserId', protectRoute, getMessages)
router.post('/', protectRoute, sendMessage)

export default router
