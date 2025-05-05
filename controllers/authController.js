import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// signup controller

export const signup = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        const existingEmail = await User.findOne({email});
        const existingMobile = await User.findOne({mobile});
        if (existingEmail || existingMobile) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
            visitCount: 1,
            lastVisit: new Date(),
        });

        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.status(201).json({token, user: newUser});
    } catch (error) {
        console.log("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// login controller

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        user.visitCount += 1;
        user.lastVisit = new Date();
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        return res.status(200).json({ token, user });
    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// delete all controller

export const deleteAll = async (req, res) => {
    try {
        const result = await User.deleteMany({});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        console.log("Delete all error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}