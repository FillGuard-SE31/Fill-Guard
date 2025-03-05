// backend/routes/userRoutes.js
import express from 'express';
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
} from '../controllers/userController.js';

// Middleware
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * Route: /api/users
 * Methods:
 *   POST → registerUser (public)
 *   GET  → getUsers (admin only)
 */
router.route('/')
  .post(registerUser)
  .get(protect, admin, getUsers);

/**
 * Route: /api/users/auth
 * Method:
 *   POST → authUser (public, logs user in)
 */
router.post('/auth', authUser);

/**
 * Route: /api/users/logout
 * Method:
 *   POST → logoutUser (public, clears JWT cookie)
 */
router.post('/logout', logoutUser);

/**
 * Route: /api/users/profile
 * Methods:
 *   GET → getUserProfile (private)
 *   PUT → updateUserProfile (private)
 */
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/**
 * Route: /api/users/:id
 * Methods:
 *   DELETE → deleteUser (admin only, can't delete own admin)
 *   GET    → getUserById (admin only)
 *   PUT    → updateUser (admin only)
 */
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;