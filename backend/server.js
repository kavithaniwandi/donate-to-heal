import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;

// routes files
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

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