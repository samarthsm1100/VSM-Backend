import express from "express";
import upload from "../middleware/multer.js";
import { addTestimonial, getTestimonials } from "../controllers/formController.js";
import {authenticate} from "../middleware/auth.js";

const router = express.Router();

router.post("/add", upload.single("image"), addTestimonial);
router.get("/testimonials", getTestimonials);

export default router;