import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  avatar: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  visitCount: { type: Number, default: 1 },
  lastVisit: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);