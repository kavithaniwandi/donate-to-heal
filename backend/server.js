import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Server Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
