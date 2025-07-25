import express from 'express';
import mongoose from 'mongoose';
import propertyRoutes from './routes/property.route.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';
import config from './config/config.js';

const app = express();

// Enable CORS
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json());

app.use(propertyRoutes);
app.use(userRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB connected');

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`🌐 CORS enabled for: ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();

