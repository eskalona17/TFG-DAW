import mongoose from 'mongoose'

const LabelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 10
    }
  }
)

const Label = mongoose.model('Label', LabelSchema)
export default Label
