//backend/routes/userRoutes.js
import express from "express";
const router = express.Router();

// Controllers
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

// Middleware
import { protect, admin } from "../middleware/authMiddleware.js";

/**
 * Route: /api/users
 * Methods:
 *   POST → registerUser (public)
 *   GET  → getUsers (admin only)
 */
router.route("/").post(registerUser).get(protect, admin, getUsers);

/**
 * Route: /api/users/auth
 * Method:
 *   POST → authUser (public, logs user in)
 */
router.post("/auth", authUser);

/**
 * Route: /api/users/logout
 * Method:
 *   POST → logoutUser (public, clears JWT cookie)
 */
router.post("/logout", logoutUser);

/**
 * Route: /api/users/profile
 * Methods:
 *   GET → getUserProfile (private)
 *   PUT → updateUserProfile (private)
 */
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

/**
 * Route: /api/users/forgot-password
 * Method:
 *   POST → forgotPassword (public, sends reset link to email)
 */
router.post("/forgot-password", forgotPassword);

/**
 * Route: /api/users/reset-password/:token
 * Method:
 *   POST → resetPassword (public, updates password with token)
 */
router.post("/reset-password/:token", resetPassword);

/**
 * Route: /api/users/:id
 * Methods:
 *   DELETE → deleteUser (admin only, can't delete own admin)
 *   GET    → getUserById (admin only)
 *   PUT    → updateUser (admin only)
 */
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;
