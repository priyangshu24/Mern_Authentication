import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";  // Correct path

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: true,
    credentials: true 
}));

// API Endpoints
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});