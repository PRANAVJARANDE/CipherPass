import mongoose, { Schema } from 'mongoose';

const keySchema = new Schema({
  privateKey: {
    type: String,
    required: true,
    trim: true,
  },
  publicKey: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

export const Key = mongoose.model('Key', keySchema);
