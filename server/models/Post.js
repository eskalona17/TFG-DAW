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
      required: true,
      minLength: 1,
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
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        text: {
          type: String,
          required: true
        },
        userProfilePic: {
          type: String
        },
        username: {
          type: String
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
