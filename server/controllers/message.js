import Conversation from '../models/Conversations.js'
import Message from '../models/Message.js'

export async function sendMessage (req, res) {
  const { recipientId, message } = req.body
  const senderId = req.user._id

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] }
    })

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recipientId],
        lastMessage: {
          text: message,
          sender: senderId
        }
      })

      await conversation.save()
    }

    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message
    })

    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: {
          text: message,
          sender: senderId
        }
      })
    ])
    res.status(201).json({ message: newMessage })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getMessages (req, res) {
  const { otherUserId } = req.params
  const userId = req.user._id

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] }
    })

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' })
    }

    const messages = await Message.find({
      conversationId: conversation._id
    }).sort({ createdAt: 1 })

    res.status(200).json(messages)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getConversations (req, res) {
  const userId = req.user._id
  try {
    const conversations = await Conversation.find({ participants: userId }).populate({
      path: 'participants',
      select: 'username profilePic'
    })
    res.status(200).json(conversations)
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
