// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the mobile menu when a link is clicked.
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-left">
        <h1>FillGuard</h1>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-right desktop-menu">
        <Link to="/">Home</Link>
        <Link to="/product">Product</Link>
        <Link to="/pricing-plans">FAQ</Link>
        <Link to="/team">Team</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/login" className="btn-primary">
          Log in
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="mobile-menu-icon">
        <button onClick={toggleMenu} aria-label="Toggle navigation">
          {/* Simple Hamburger SVG Icon */}
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path d="M0,5 30,5" stroke="#333" strokeWidth="3" />
            <path d="M0,15 30,15" stroke="#333" strokeWidth="3" />
            <path d="M0,25 30,25" stroke="#333" strokeWidth="3" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link onClick={handleLinkClick} to="/">
              Home
            </Link>
            <Link onClick={handleLinkClick} to="/product">
              Product
            </Link>
            <Link onClick={handleLinkClick} to="/pricing-plans">
              FAQ
            </Link>
            <Link onClick={handleLinkClick} to="/team">
              Team
            </Link>
            <Link onClick={handleLinkClick} to="/shop">
              Shop
            </Link>
            <Link onClick={handleLinkClick} to="/login" className="btn-primary">
              Log in
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
