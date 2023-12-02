import corsOptions from '../config/corsOptions.js'
import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import Message from '../models/Message.js'
import Conversation from '../models/Conversations.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    corsOptions,
    methods: ['GET', 'POST']
  }
})

export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId]
}

const userSocketMap = {} // userId: socketId

io.on('connection', (socket) => {
  console.log('user connected', socket.id)
  const userId = socket.handshake.query.userId

  if (userId !== 'undefined') userSocketMap[userId] = socket.id
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('markMessagesAsSeen', async ({ conversationId, userId }) => {
    try {
      await Message.updateMany({ conversationId, seen: false }, { $set: { seen: true } })
      await Conversation.updateOne({ _id: conversationId }, { $set: { 'lastMessage.seen': true } })
      io.to(userSocketMap[userId]).emit('messagesSeen', { conversationId })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { io, server, app }
