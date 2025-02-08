// src/components/Footer.js
import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="footer-content">
        <p>© 2025 by SE-31. created with React</p>
        <p>Contact: 123-456-7890 | FillGuard.com</p>
        <div className="footer-socials">
          <a href="#!">LinkedIn</a>
          <a href="#!">Twitter</a>
          <a href="#!">Facebook</a>
          <a href="#!">YouTube</a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;