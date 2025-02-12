import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IoTimg1 from "../assets/img/IoTimg1.png";
import IoTimg2 from "../assets/img/IoTimg2.png";
import IoTimg3 from "../assets/img/IoTimg3.png";
import { useNavigate } from "react-router-dom";

const images = [IoTimg1, IoTimg2, IoTimg3];

function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Change every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero container-fluid py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Text Content */}
          <div className="col-lg-6 col-md-6 col-sm-12 text-start">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="display-4 fw-bold"
            >
              Smart Bin Management <span className="highlight">IoT Solutions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lead"
            >
              For Every Environment
            </motion.p>
            <motion.button
              className="btn btn-dark btn-lg mt-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              onClick={() => navigate("/product")}
            >
              Learn More
            </motion.button>
          </div>

          {/* Right Side - Image Slideshow */}
          <div className="col-lg-6 col-md-6 col-sm-12 text-center">
            <motion.img
              key={index} // Ensures smooth transitions
              src={images[index]}
              alt="IoT Illustration"
              className="img-fluid hero-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
