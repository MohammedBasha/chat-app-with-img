import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Allow extracting json data out of the requests body
app.use(express.json());

// Authentication route
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
