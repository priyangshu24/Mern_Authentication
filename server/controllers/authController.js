import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {
    // Destructure the request body
    const { name, email, password } = req.body;
    // Check if user exists
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        // Check if user exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // This is important for cross-site requests
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // Send verification email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Email Verification',
            text: `Welcome to our Website. Your email is verified with your email id: ${email}`
        }
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Registration successful" });

    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid Email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" });
        }
        // Generate JWT token
        const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // This is important for cross-site requests
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.json({ success: true, message: "Login successful" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // 'search' was written instead of 'secure'
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logout successful" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
};