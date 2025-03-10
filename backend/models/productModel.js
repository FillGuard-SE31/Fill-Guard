// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
// }, { timestamps: true });

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   brand: { type: String, required: true },
//   category: { type: String, required: true },
//   description: { type: String, required: true },
//   reviews: [reviewSchema],
//   rating: { type: Number, default: 0 },
//   numReviews: { type: Number, default: 0 },
//   price: { type: Number, required: true, default: 0 },
//   countInStock: { type: Number, required: true, default: 0 },
// }, { timestamps: true });

// const Product = mongoose.model("Product", productSchema);
// export default Product;

// backend/models/productModel.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // Links review to a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Must reference your User model
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },

    // Store all reviews in an array
    reviews: [reviewSchema],

    // The average rating across all reviews
    rating: { type: Number, default: 0 },

    // How many reviews this product has
    numReviews: { type: Number, default: 0 },

    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },

    // Optionally link product to an admin user who created it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;