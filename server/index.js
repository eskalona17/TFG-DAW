import { errorHandler } from './middlewares/errorHandler.js'
import corsOptions from './config/corsOptions.js'
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

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// This disables the X-Powered-By header (contains the name and version of the web framework) from HTTP responses.
app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())

// Routes
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', rootRouter)
app.use('/user', userRouter)
app.use('/posts', postRouter)

app.all('*', errorHandler)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
