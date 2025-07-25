import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../config/config.js';

const { jwt: jwtConfig } = config;

// Generate Access Token (expires in 15 minutes)
export const generateAccessToken = (userId, role = 'user') => {
  return jwt.sign(
    { userId, role, type: 'access' },
    jwtConfig.secret,
    { expiresIn: '15m' }
  );
};

// Generate Refresh Token (expires in 7 days)
export const generateRefreshToken = (userId, role = 'user') => {
  return jwt.sign(
    { userId, role, type: 'refresh' },
    jwtConfig.refreshSecret,
    { expiresIn: '7d' }
  );
};

// Generate both tokens
export const generateTokens = (userId, role = 'user') => {
  return {
    accessToken: generateAccessToken(userId, role),
    refreshToken: generateRefreshToken(userId, role)
  };
};

// Middleware to authenticate JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    if (decoded.type !== 'access') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token type'
      });
    }

    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify role matches token (security check)
    if (decoded.role !== user.role) {
      return res.status(401).json({
        success: false,
        message: 'Token role mismatch - please login again'
      });
    }

    // Add user and role to request object
    req.user = user;
    req.userRole = user.role;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token expired',
        code: 'TOKEN_EXPIRED'
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token'
      });
    } else {
      console.error('Auth middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Authentication error'
      });
    }
  }
};

// Middleware to verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.refreshSecret);
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    throw error;
  }
};

// Role-based authorization middleware
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Admin only middleware
export const requireAdmin = requireRole(['admin', 'super_admin']);

// Agent or higher middleware
export const requireAgent = requireRole(['agent', 'admin', 'super_admin']);

// Optional middleware for routes that work with or without authentication
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, JWT_CONFIG.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      if (user && user.isActive && decoded.role === user.role) {
        req.user = user;
        req.userRole = user.role;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
