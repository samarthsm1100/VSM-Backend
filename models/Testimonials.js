import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model("Testimonial", testimonialSchema);