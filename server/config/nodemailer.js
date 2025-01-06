import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: "82f180001@smtp-brevo.com",
        pass: "6hDQO8ZPkYTc1UmS"
    }
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP Error:", error);
    } else {
        console.log("Server is ready to send emails");
    }
});

export default transporter;