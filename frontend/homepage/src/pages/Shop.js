// src/pages/Shop.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import IoTImageSlider from "../components/IoTImageSlider";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

// Framer Motion variants for simple fade-in
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

function Shop() {
  // Track local "added to cart" message
  const [addedToCart, setAddedToCart] = useState(false);

  // For the product rating / reviews
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Replace this with your actual product's ID from the DB
  const PRODUCT_ID = "67c93434c7268ca798700706";

  // Fetch product details from the DB
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(PRODUCT_ID);

  const dispatch = useDispatch();

  // Handle Add to Cart
  const handleAddToCart = () => {
    // If product is available, add with qty=1 (or let user choose)
    if (product) {
      dispatch(addToCart({ ...product, qty: 1 }));
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };

  // Handle local review submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      rating,
      comment: comment.trim(),
    };
    setReviews([...reviews, newReview]);

    // Clear input fields
    setName("");
    setRating(5);
    setComment("");
  };

  // If product is loading or error
  if (isLoading) return <Loader />;
  if (error) {
    return (
      <div className="container py-5">
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      </div>
    );
  }

  // If no product found, you can handle that too
  if (!product) {
    return (
      <div className="container py-5">
        <Message variant="info">Product not found!</Message>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <motion.div
        className="row"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Left Column: Image Slider */}
        <div className="col-md-6 d-flex justify-content-center mb-4">
          <IoTImageSlider />
        </div>

        {/* Right Column: Product Details from DB */}
        <div className="col-md-6">
          <h1 className="mb-3" style={{ color: "#000" }}>
            {product.name}
          </h1>
          <h3 className="text-muted mb-4">${product.price}</h3>

          <p className="mb-4" style={{ lineHeight: 1.6, color: "#000" }}>
            {product.description}
          </p>

          {/* Additional features if you want to display them */}
          {product.features && (
            <ul className="list-unstyled mb-4" style={{ color: "#000" }}>
              {product.features.map((feat, idx) => (
                <li key={idx}>• {feat}</li>
              ))}
            </ul>
          )}

          <button
            className="btn btn-lg"
            style={{ backgroundColor: "#ffc300", color: "#000", border: "none" }}
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          {addedToCart && (
            <motion.div
              className="alert alert-success mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Item added to cart!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        className="row mt-5 pt-custom"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="mb-4" style={{ color: "#000" }}>
          Customer Reviews
        </h2>

        {/* Form to Add a Review */}
        <div className="col-md-6 mb-4">
          <div className="card p-4" style={{ backgroundColor: "#666" }}>
            <h4 className="mb-3" style={{ color: "#fff" }}>
              Leave a Review
            </h4>

            <form onSubmit={handleReviewSubmit}>
              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label" style={{ color: "#fff" }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{ borderColor: "#000" }}
                />
              </div>

              {/* Star Rating */}
              <div className="mb-3">
                <label className="form-label" style={{ color: "#fff" }}>
                  Rating
                </label>
                <div>
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <FaStar
                        key={i}
                        size={24}
                        style={{ marginRight: 8, cursor: "pointer" }}
                        color={starValue <= rating ? "#ffc300" : "#ccc"}
                        onClick={() => setRating(starValue)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Comment Field */}
              <div className="mb-3">
                <label
                  htmlFor="comment"
                  className="form-label"
                  style={{ color: "#fff" }}
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  className="form-control"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  style={{ borderColor: "#000" }}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#ffc300", color: "#666", border: "none" }}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Display Reviews */}
        <div className="col-md-6">
          <div className="card p-4" style={{ backgroundColor: "#666" }}>
            <h4 className="mb-3" style={{ color: "#fff" }}>
              All Reviews
            </h4>
            {reviews.length === 0 ? (
              <p style={{ color: "#fff" }}>
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="mb-4 pb-3"
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <h5 className="fw-bold" style={{ color: "#fff" }}>
                    {rev.name}
                  </h5>

                  {/* Star Display */}
                  <div className="mb-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FaStar key={i} size={20} color="#ffc300" />
                    ))}
                    {[...Array(5 - rev.rating)].map((_, i) => (
                      <FaStar key={i} size={20} color="#ccc" />
                    ))}
                  </div>

                  <p style={{ color: "#fff" }}>{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Shop;