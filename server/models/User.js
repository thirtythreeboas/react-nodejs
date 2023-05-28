import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    subscribeDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    passwordHash: {
      type: String,
      required: true,
    },
    photo: String
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)