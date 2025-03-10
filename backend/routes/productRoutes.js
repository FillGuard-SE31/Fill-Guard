// // backend/routes/productRoutes.js
// import express from 'express';
// const router = express.Router();
// import {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from '../controllers/productController.js';

// // Middleware
// import { protect, admin } from '../middleware/authMiddleware.js';

// /**
//  * Route: /api/products
//  * Methods:
//  *   GET   → getProducts (public)
//  *   POST  → createProduct (admin only)
//  */
// router
//   .route('/')
//   .get(getProducts)
//   .post(protect, admin, createProduct);

// /**
//  * Route: /api/products/:id
//  * Methods:
//  *   GET     → getProductById (public)
//  *   PUT     → updateProduct (admin only)
//  *   DELETE  → deleteProduct (admin only)
//  */
// router
//   .route('/:id')
//   .get(getProductById)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

// export default router;

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