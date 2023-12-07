import { getConversation, getConversations, getMessages, sendMessage } from '../controllers/message.js'
import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'

const router = express.Router()

router.get('/conversations', protectRoute, getConversations)
router.get('/:otherUserId', protectRoute, getMessages)
router.post('/conversation', protectRoute, getConversation)
router.post('/', protectRoute, sendMessage)

export default router
