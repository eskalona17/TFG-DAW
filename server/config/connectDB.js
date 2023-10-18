import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.error(`error: ${error.message}`)
    process.exit(1)
  }
}

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

export default connectDB
