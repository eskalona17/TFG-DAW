import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    seen: {
      type: Boolean,
      default: false
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
)

const Message = mongoose.model('Message', MessageSchema)
export default Message
