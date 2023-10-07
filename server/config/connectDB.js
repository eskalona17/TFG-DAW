import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (err) {
    console.log(err)
  }
}

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

export { connectDB }
