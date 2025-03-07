// backend/server.js
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // If you need cross-origin resource sharing

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import your route files
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize an Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // If you need to allow requests from other domains
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// For handling file paths in ES modules
const __dirname = path.resolve();

// Optionally serve uploaded images from the uploads/ folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve the React frontend build
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Any request that doesn't match an API route gets the frontend's index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  // In development, just send a message on the root
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Mount your API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// If using PayPal, provide the client ID
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' })
);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});