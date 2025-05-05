import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { signup, login, deleteAll } from '../controllers/authController.js';

const router = express.Router();

// signup route
router.post('/signup', signup);

// login route
router.post('/login', login);

// google OAuth Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const payload = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

// delete all users
router.delete('/deleteAll', deleteAll);

export default router;