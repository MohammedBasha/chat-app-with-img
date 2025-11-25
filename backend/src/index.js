import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Allow extracting json data out of the requests body
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// CORS middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Authentication route
app.use("/api/auth", authRoutes);

// Message routes
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
