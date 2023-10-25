import corsOptions from '../config/corsOptions.js'
import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

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

  socket.on('disconnect', () => {
    console.log('user disconnected')
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { io, server, app }
