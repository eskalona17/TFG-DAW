import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  // Campos obligatorios
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Campo obligatorio y con enum
  profile: {
    type: String,
    required: true,
    enum: ['personal', 'profesional'],
    default: 'personal'
  },
  // Campos opcionales
  address: {
    type: String,
    minLength: 3,
    maxLength: 255
  },
  postalCode: {
    type: Number,
    min: 1000,
    max: 52999
  },
  city: {
    type: String,
    minLength: 3,
    maxLength: 50
  },
  country: {
    type: String,
    enum: ['España']
  }
},
{
  timestamps: true
})

const User = mongoose.model('User', UserSchema)
export default User
