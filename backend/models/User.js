const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  passwordHash: { type: String },
  country: String,
  state: String,
  city: String,
  dob: Date,
  interests: [String],
  profileImage: String,
  social: {
    provider: String,
    providerId: String
  },
  otp: {
    code: String,
    expiresAt: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
