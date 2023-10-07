import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './config/connectDB.js'
import rootRouter from './routes/root.js'
import userRouter from './routes/user.js'
import { config } from 'dotenv'
import express from 'express'

config()
connectDB()

const app = express()

// This disables the X-Powered-By header (contains the name and version of the web framework) from HTTP responses.
app.disable('x-powered-by')

app.use(express.json())

app.use('/', rootRouter)
app.use('/user', userRouter)

app.all('*', errorHandler)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
