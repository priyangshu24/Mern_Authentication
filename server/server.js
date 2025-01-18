import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// API Endpoints
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});