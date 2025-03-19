// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview, // NEW
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// NEW OR UPDATED: Add a review
router.post('/:id/reviews', protect, addProductReview);

export default router;