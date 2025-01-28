import mongoose,{Schema} from 'mongoose'

const passwordSchema = new Schema({
    websiteURL: {
      type: String,
      required: true,
      trim: true,
    },
    websiteName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    }
  })

export const Password=mongoose.model('Password',passwordSchema);