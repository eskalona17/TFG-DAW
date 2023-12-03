import mongoose from 'mongoose'

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    lastMessage: {
      text: String,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      seen: {
        type: Boolean,
        default: false
      },
      timestamp: {
        type: Date,
        default: Date.now()
      }
    }
  },
  {
    timestamps: true
  }
)

const Conversation = mongoose.model('Conversation', ConversationSchema)
export default Conversation
