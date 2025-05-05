import cloudinary from "../utils/cloudinary.js";
import Testimonial from "../models/Testimonials.js";
import fs from "fs";

export const addTestimonial = async (req, res) => {
  try {
    const { name, role, description, date } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Image is required" });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "testimonials",
    });

    // Remove local file after upload
    fs.unlinkSync(file.path);

    const newTestimonial = new Testimonial({
      name,
      role,
      description,
      date,
      imageUrl: result.secure_url,
    });

    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
