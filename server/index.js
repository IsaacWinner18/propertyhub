import express from "express";
import mongoose from "mongoose";
import propertyRoutes from "./routes/property.route.js";
import { config } from "dotenv";
import cors from 'cors'
config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors())

app.use(express.json());

// Register property routes
app.use(propertyRoutes);

app.listen(PORT, () => {
  mongoose.connect(`${MONGODB_URI}`);
  console.log(`Listening on PORT ${PORT}`);
});
