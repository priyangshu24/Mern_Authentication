import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { response } from 'express';

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
}

export const userVerifyOtp = async (req, res) => {
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(user.isVerified){
            return res.json({success: false, message: "Account already verified"});
        }
       const otp =  String(Math.floor(100000 + Math.rendom()*900000));

       user.verifyOtp = otp;
       user.verifyOtpExpireAt = new Date()+ 24*60*60*1000;
       await user.save();

       const mailOptions = {
        from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your account verification OTP is: ${otp}. Please enter this OTP to verify your account.`
       }
       await transporter.sendMail(mailOptions);
       return res.json({ success: true, message: 
        "Verification OTP sent to your email" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Please provide all required fields" });
    }
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({ success: false, message: "User not found" });
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success: false, message: "Invalid OTP" });
        }
        if (Date.now() > user.verifyOtpExpireAt){
            return res.json({ success: false, message: "OTP expired" });
        }
        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        // Verify email successfully
        return res.json({ success: true, message: "Email verified successfully" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
// Check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try{
        return res.json({ success: true, message: "User is authenticated" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Reset password otp
export const sendResetotp = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }
    try{
        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({ success: false, message: "User not found" });
        }
        const otp =  String(Math.floor(100000 + Math.rendom()*900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = new Date()+ 15*60*1000;

        await user.save();
 
        const mailOptions = {
         from: process.env.SENDER_EMAIL,
             to: user.email,
             subject: 'Account Verification OTP',
             text: `Your account verification OTP is: ${otp}. Please enter this OTP to verify your account.`
        }
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: 
         " OTP sent to your email" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
// Reset password
export const resetPassword = async (req, res) => {
    const { email,otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP and new password are required" });
    }

    try {
        
        const user = await userModel.findOne({ email});
        if(!user){
            return res.json({ success: false, message: "User not found" });
        }
        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (user.resetOtpExpireAt < new Date()){
            return res.json({ success: false, message: "OTP expired" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({ success: true, message: "Password reset successful" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}



