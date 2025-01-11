import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    verifyOtp: {  // Changed from sendVerifyOtp to verifyOtp to match controller
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,  // Keeping as Number for timestamp
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,  // Keeping as Number for timestamp
        default: 0
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields
});
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;