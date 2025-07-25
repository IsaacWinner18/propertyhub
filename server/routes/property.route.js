import express from "express";
import {
  addProperty,
  getProperties,
  getDashboardStats,
} from "../controllers/property.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add new property
router.post("/api/add/properties", addProperty);

// Get all properties
router.get("/api/properties", getProperties);

// Get admin dashboard stats
router.get("/api/admin/dashboard-stats", authenticateToken, getDashboardStats);

export default router;
