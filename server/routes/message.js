import { createConversation, getConversation, getConversations, getMessages, sendMessage } from '../controllers/message.js'
import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'

const router = express.Router()

router.get('/conversations', protectRoute, getConversations)
router.get('/conversation/:id', protectRoute, getConversation)
router.get('/:otherUserId', protectRoute, getMessages)
router.post('/', protectRoute, sendMessage)
router.post('/new', protectRoute, createConversation)

export default router
