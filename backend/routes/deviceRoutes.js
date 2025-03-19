// backend/routes/deviceRoutes.js
import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import Device from "../models/Device.js";

// GET /api/devices/mine - get devices belonging to the logged-in user
router.get("/mine", protect, async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user._id }).populate("product", "name image");
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching devices" });
  }
});

export default router;