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
      maxLength: 500
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // en false de momento para hacer pruebas, más adelante será true
    },
    img: {
      type: String
    }, // Por si no nos queremos complicar más, guardar solo el número de favs y no los usuarios
    favorites: {
      type: Number,
      default: 0
    }, /*
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    } */
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
        userName: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

const Post = mongoose.model('Post', PostSchema)

export default Post
