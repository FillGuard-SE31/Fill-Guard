// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

// Middleware
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * Route: /api/products
 * Methods:
 *   GET   → getProducts (public)
 *   POST  → createProduct (admin only)
 */
router
  .route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

/**
 * Route: /api/products/:id
 * Methods:
 *   GET     → getProductById (public)
 *   PUT     → updateProduct (admin only)
 *   DELETE  → deleteProduct (admin only)
 */
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;