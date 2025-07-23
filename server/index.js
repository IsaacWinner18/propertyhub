import express from "express";
import mongoose from "mongoose";
import propertyRoutes from "./routes/property.route.js";
import { config } from "dotenv";
import cors from 'cors'
config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(
  cors({
    origin: process.env.CORS || "http://localhost:3000",
  })
);

app.use(express.json());

app.use(propertyRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();

