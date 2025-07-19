import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT;


const uploadDir = path.resolve("uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:   (req, file, cb) => {
    // user-<timestamp>-<originalname>
    cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({ storage });

// routes files
app.use("/users", userRoutes);
app.use("/uploads", express.static(uploadDir));

app.use(express.json());
app.use(cors());

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });

    } catch (err) {
        console.error("Failed to start server :", err);
        process.exit(1);
    }
}

start();