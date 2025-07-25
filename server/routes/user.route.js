import express from "express";
import {
  signup,
  login,
  logout,
  getProfile,
  updateProfile,
  refreshToken,
  forgotPassword,
  resetPassword
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);
router.post("/api/auth/refresh-token", refreshToken);
router.post("/api/auth/forgot-password", forgotPassword);
router.post("/api/auth/reset-password", resetPassword);

// Protected routes (require authentication)
router.post("/api/auth/logout", authenticateToken, logout);
router.get("/api/user/profile", authenticateToken, getProfile);
router.put("/api/user/profile", authenticateToken, updateProfile);

export default router;