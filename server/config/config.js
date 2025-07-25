import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in the server directory
const envPath = path.resolve(__dirname, '../.env');
const result = config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Log environment variables (except sensitive ones) for debugging
console.log('Environment variables loaded successfully');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('Server port:', process.env.PORT);

// Export the environment variables
export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS || 'http://localhost:3000',
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiration: '15m',
    refreshExpiration: '7d'
  }
};
