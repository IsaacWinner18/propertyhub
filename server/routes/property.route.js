import express from "express";
import {
  addProperty,
  getProperties,
} from "../controllers/property.controller.js";

const router = express.Router();

// Add new property
router.post("/api/add/properties", addProperty);

// Get all properties
router.get("/api/properties", getProperties);

export default router;
