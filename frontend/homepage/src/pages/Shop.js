// // src/pages/Shop.js

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaStar } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import Slider from "react-slick";

// import IoTImageSlider from "../components/IoTImageSlider";
// import { useGetProductDetailsQuery, useAddProductReviewMutation } from "../slices/productsApiSlice";
// import { addToCart } from "../slices/cartSlice";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// // Framer Motion variants for a simple fade-in
// const fadeIn = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8 },
//   },
// };

// function Shop() {
//   // Replace with your actual product's ID from the DB
//   const PRODUCT_ID = "67d505d03a6855d5056ba3ad";

//   // 1) Fetch product details
//   // 2) Mutation to add product review
//   const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(PRODUCT_ID);
//   const [addProductReview, { isLoading: isReviewLoading }] = useAddProductReviewMutation();

//   // Cart UI state
//   const [addedToCart, setAddedToCart] = useState(false);

//   // Local state for review form
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // Redux Hooks
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);

//   // Handle Add to Cart
//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart({ ...product, qty: 1 }));
//       setAddedToCart(true);
//       setTimeout(() => setAddedToCart(false), 2000);
//     }
//   };

//   // Submit new review
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     if (!userInfo) {
//       toast.error("You must be logged in to leave a review.");
//       return;
//     }

//     try {
//       // Use our RTK Query mutation
//       await addProductReview({
//         productId: PRODUCT_ID,
//         rating,
//         comment,
//       }).unwrap();

//       toast.success("Review submitted successfully!");
//       setRating(5);
//       setComment("");

//       // Refetch the product to update the review list
//       refetch();
//     } catch (err) {
//       toast.error(err?.data?.message || "Error submitting review.");
//     }
//   };

//   // React Slick settings for the review carousel
//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1, // Show 1 review at a time
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//   };

//   // If product data is loading or there's an error
//   if (isLoading) return <Loader />;
//   if (error) {
//     return (
//       <div className="container py-5">
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       </div>
//     );
//   }

//   // If product not found
//   if (!product) {
//     return (
//       <div className="container py-5">
//         <Message variant="info">Product not found!</Message>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">
//       <motion.div className="row" initial="hidden" animate="visible" variants={fadeIn}>
//         {/* Left Column: Image Slider */}
//         <div className="col-md-6 d-flex justify-content-center mb-4">
//           <IoTImageSlider />
//         </div>

//         {/* Right Column: Product Details */}
//         <div className="col-md-6">
//           <h1 className="mb-3">{product.name}</h1>
//           <h3 className="text-muted mb-4">${product.price}</h3>
//           <p className="mb-4" style={{ lineHeight: 1.6 }}>
//             {product.description}
//           </p>

//           {product.features && (
//             <ul className="list-unstyled mb-4">
//               {product.features.map((feat, idx) => (
//                 <li key={idx}>• {feat}</li>
//               ))}
//             </ul>
//           )}

//           <button
//             className="btn btn-lg"
//             style={{ backgroundColor: "#ffc300", color: "#000", border: "none" }}
//             onClick={handleAddToCart}
//             disabled={product.countInStock === 0}
//           >
//             {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
//           </button>

//           {addedToCart && (
//             <motion.div
//               className="alert alert-success mt-3"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               Item added to cart!
//             </motion.div>
//           )}
//         </div>
//       </motion.div>

//       {/* Reviews Section */}
//       <motion.div
//         className="row mt-5 pt-custom"
//         initial="hidden"
//         whileInView="visible"
//         variants={fadeIn}
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <h2 className="mb-4">Customer Reviews</h2>

//         {/* Submit Review Form */}
//         <div className="col-md-6 mb-4">
//           <div className="card p-4" style={{ backgroundColor: "#666" }}>
//             <h4 className="mb-3" style={{ color: "#fff" }}>
//               Leave a Review
//             </h4>

//             <form onSubmit={handleReviewSubmit}>
//               {/* Star Rating */}
//               <div className="mb-3">
//                 <label className="form-label" style={{ color: "#fff" }}>
//                   Rating
//                 </label>
//                 <div>
//                   {[...Array(5)].map((_, i) => {
//                     const starValue = i + 1;
//                     return (
//                       <FaStar
//                         key={i}
//                         size={24}
//                         style={{ marginRight: 8, cursor: "pointer" }}
//                         color={starValue <= rating ? "#ffc300" : "#ccc"}
//                         onClick={() => setRating(starValue)}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Comment Field */}
//               <div className="mb-3">
//                 <label htmlFor="comment" className="form-label" style={{ color: "#fff" }}>
//                   Comment
//                 </label>
//                 <textarea
//                   id="comment"
//                   className="form-control"
//                   rows="4"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   placeholder="Write your review..."
//                   required
//                 />
//               </div>

//               <ButtonOrSpinner
//                 isLoading={isReviewLoading}
//                 text="Submit Review"
//                 style={{ backgroundColor: "#ffc300", color: "#666", border: "none" }}
//               />
//             </form>
//           </div>
//         </div>

//         {/* Display Reviews in a Slider */}
//         <div className="col-md-6">
//           <div className="card p-4" style={{ backgroundColor: "#666" }}>
//             <h4 className="mb-3" style={{ color: "#fff" }}>
//               All Reviews
//             </h4>
//             {(!product.reviews || product.reviews.length === 0) ? (
//               <p style={{ color: "#fff" }}>
//                 No reviews yet. Be the first to review this product!
//               </p>
//             ) : (
//               <Slider {...sliderSettings}>
//                 {product.reviews.map((rev) => (
//                   <div key={rev._id} style={{ padding: "0 20px" }}>
//                     <h5 className="fw-bold" style={{ color: "#fff" }}>
//                       {rev.name}
//                     </h5>
//                     <div className="mb-1">
//                       {[...Array(rev.rating)].map((_, i) => (
//                         <FaStar key={i} size={20} color="#ffc300" />
//                       ))}
//                       {[...Array(5 - rev.rating)].map((_, i) => (
//                         <FaStar key={i} size={20} color="#ccc" />
//                       ))}
//                     </div>
//                     <p style={{ color: "#fff" }}>{rev.comment}</p>
//                   </div>
//                 ))}
//               </Slider>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /**
//  * A helper button that shows a spinner while isLoading is true.
//  * Otherwise, it displays the given 'text'.
//  */
// const ButtonOrSpinner = ({ isLoading, text, ...rest }) => {
//   return (
//     <button type="submit" className="btn" disabled={isLoading} {...rest}>
//       {isLoading ? "Submitting..." : text}
//     </button>
//   );
// };

// export default Shop;

// src/pages/Shop.js
// src/pages/Shop.js

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { Card, ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import IoTImageSlider from "../components/IoTImageSlider";
import { useGetProductDetailsQuery, useAddProductReviewMutation } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

// Framer Motion variants for a simple fade-in
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

function Shop() {
  // Replace with your actual product's ID from the DB
  const PRODUCT_ID = "67d505d03a6855d5056ba3ad";

  // Fetch product details and review mutation
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(PRODUCT_ID);
  const [addProductReview, { isLoading: isReviewLoading }] = useAddProductReviewMutation();

  // Local state for review form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Local state for quantity selection
  const [qty, setQty] = useState(1);

  // Redux Hooks
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Handle Add to Cart: dispatch action and redirect to the cart page
  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
      navigate("/cart");
    }
  };

  // Submit new review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    try {
      await addProductReview({
        productId: PRODUCT_ID,
        rating,
        comment,
      }).unwrap();

      toast.success("Review submitted successfully!");
      setRating(5);
      setComment("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Error submitting review.");
    }
  };

  // React Slick settings for the review carousel
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

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
  if (!product) {
    return (
      <div className="container py-5">
        <Message variant="info">Product not found!</Message>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <motion.div className="row" initial="hidden" animate="visible" variants={fadeIn}>
        {/* Left Column: Image Slider */}
        <div className="col-md-6 d-flex justify-content-center mb-4">
          <IoTImageSlider />
        </div>

        {/* Right Column: Product Details and Info Card */}
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <h3 className="text-muted mb-4">${product.price}</h3>
          <p className="mb-4" style={{ lineHeight: 1.6 }}>
            {product.description}
          </p>

          {product.features && (
            <ul className="list-unstyled mb-4">
              {product.features.map((feat, idx) => (
                <li key={idx}>• {feat}</li>
              ))}
            </ul>
          )}

          {/* Product Info Card */}
          <Card className="mb-4">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <div className="text-center">
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  style={{
                       backgroundColor: "black",
                       color: "white",
                       padding: "12px",
                       border: "none",
                       cursor: "pointer",
                       transition: "background-color 0.3s ease",
                       borderRadius: "30px",
                       fontSize: "18px",
                       width: "25%",
                       position: "center"
                     }}
                     onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffc300")}
                     onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
                >
                  Add To Cart
                </Button>
                </div>
              </ListGroup.Item>
              {/* Added Rating */}
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
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
        <h2 className="mb-4">Customer Reviews</h2>

        {/* Submit Review Form */}
        <div className="col-md-6 mb-4">
          <div className="card p-4" style={{ backgroundColor: "#666" }}>
            <h4 className="mb-3" style={{ color: "#fff" }}>
              Leave a Review
            </h4>
            <form onSubmit={handleReviewSubmit}>
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
                <label htmlFor="comment" className="form-label" style={{ color: "#fff" }}>
                  Comment
                </label>
                <textarea
                  id="comment"
                  className="form-control"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review..."
                  required
                />
              </div>
              <ButtonOrSpinner
                isLoading={isReviewLoading}
                text="Submit Review"
                style={{ backgroundColor: "#ffc300", color: "#666", border: "none" }}
              />
            </form>
          </div>
        </div>

        {/* Display Reviews in a Slider */}
        <div className="col-md-6">
          <div className="card p-4" style={{ backgroundColor: "#666" }}>
            <h4 className="mb-3" style={{ color: "#fff" }}>
              All Reviews
            </h4>
            {(!product.reviews || product.reviews.length === 0) ? (
              <p style={{ color: "#fff" }}>
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              <Slider {...sliderSettings}>
                {product.reviews.map((rev) => (
                  <div key={rev._id} style={{ padding: "0 20px" }}>
                    <h5 className="fw-bold" style={{ color: "#fff" }}>
                      {rev.name}
                    </h5>
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
                ))}
              </Slider>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * A helper button that shows a spinner while isLoading is true.
 * Otherwise, it displays the given 'text'.
 */
const ButtonOrSpinner = ({ isLoading, text, ...rest }) => {
  return (
    <button type="submit" className="btn" disabled={isLoading} {...rest}>
      {isLoading ? "Submitting..." : text}
    </button>
  );
};

export default Shop;