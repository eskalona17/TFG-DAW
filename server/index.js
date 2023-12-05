import { errorHandler } from './middlewares/errorHandler.js'
import corsOptions from './config/corsOptions.js'
import { app, server } from './socket/socket.js'
import messageRouter from './routes/message.js'
import connectDB from './config/connectDB.js'
import rootRouter from './routes/root.js'
import userRouter from './routes/user.js'
import postRouter from './routes/post.js'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config()

connectDB()

const PORT = process.env.PORT
const BASEURL = process.env.BASEURL

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// This disables the X-Powered-By header (contains the name and version of the web framework) from HTTP responses.
app.disable('x-powered-by')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())

// Routes
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', rootRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/messages', messageRouter)
app.use('*', errorHandler)

server.listen(PORT, () => {
  console.log(`Server started at ${BASEURL}:${PORT}`)
})
