import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

// Now will delete this file later as socket.io server is moved to lib/socket.js
// const app = express();

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
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
