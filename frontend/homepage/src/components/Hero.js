// src/components/Hero.js
import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/img/19362653.jpg";

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 data-aos="fade-down">Smart IoT Solutions</h2>
        <p data-aos="fade-up" data-aos-delay="200">For Every Environment</p>
        <button data-aos="fade-up" data-aos-delay="400">Get Started</button>
        <div style={{ marginTop: "1rem" }}>
        <motion.img
            src={heroImage}  // Use the imported image here
            alt="Hero illustration"
            style={{ maxWidth: "100%", height: "auto", marginTop: "2rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;