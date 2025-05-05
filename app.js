import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport + session setup
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes); 
// app.use("/api/testimonials", testimonialRoutes);

export default app;
