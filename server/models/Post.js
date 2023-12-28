import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      maxLength: 500
    },
    media: {
      type: String,
      default: ''
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    },
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        text: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

PostSchema.index({ content: 'text', 'replies.username': 'text' })

const Post = mongoose.model('Post', PostSchema)

export default Post
