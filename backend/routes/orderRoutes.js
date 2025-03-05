// backend/routes/orderRoutes.js
import express from 'express';
const router = express.Router();

// Controllers
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';

// Middleware
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * Route: /api/orders
 * Methods:
 *   POST → addOrderItems  (private)
 *   GET  → getOrders (admin only)
 */
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

/**
 * Route: /api/orders/mine
 * Methods:
 *   GET → getMyOrders (private)
 */
router.route('/mine')
  .get(protect, getMyOrders);

/**
 * Route: /api/orders/:id
 * Methods:
 *   GET → getOrderById (private)
 */
router.route('/:id')
  .get(protect, getOrderById);

/**
 * Route: /api/orders/:id/pay
 * Methods:
 *   PUT → updateOrderToPaid (private)
 */
router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

/**
 * Route: /api/orders/:id/deliver
 * Methods:
 *   PUT → updateOrderToDelivered (admin only)
 */
router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

export default router;