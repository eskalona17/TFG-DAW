import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255
    },
    content: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 2000
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // en false de momento para hacer pruebas, más adelante será true
    }
  },
  {
    timestamps: true
  }
)

const Post = mongoose.model('Post', PostSchema)

export default Post
