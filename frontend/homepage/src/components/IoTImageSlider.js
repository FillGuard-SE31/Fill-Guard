// src/components/IoTImageSlider.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// Example placeholders (replace with your actual 3 images)
import iotImage1 from "../assets/img/IoTimg1.png";
import iotImage2 from "../assets/img/IoTimg2.png";
import iotImage3 from "../assets/img/IoTimg3.png";

const IoTImageSlider = () => {
  // Images array
  const images = [iotImage1, iotImage2, iotImage3];

  // Track current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Next
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle Previous
  const handlePrev = () => {
    // Add 'images.length' first to avoid negative remainder
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container">
      {/* Slider Wrapper */}
      <div className="position-relative d-flex justify-content-center align-items-center mb-3">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="btn btn-outline-secondary me-2 slider-arrow"
          style={{
            position: "absolute",
            left: 0,
            zIndex: 1,
          }}
        >
          <span>&lt;</span>
        </button>

        {/* Main Image (animated) */}
        <motion.img
          key={currentIndex} // helps framer-motion know when to animate
          src={images[currentIndex]}
          alt="IoT Device"
          className="img-fluid"
          style={{ maxHeight: "400px", objectFit: "cover" }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="btn btn-outline-secondary ms-2 slider-arrow"
          style={{
            position: "absolute",
            right: 0,
            zIndex: 1,
          }}
        >
          <span>&gt;</span>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="d-flex justify-content-center">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="me-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                cursor: "pointer",
                border: index === currentIndex ? "2px solid #000" : "2px solid transparent",
              }}
              onClick={() => handleThumbnailClick(index)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IoTImageSlider;
