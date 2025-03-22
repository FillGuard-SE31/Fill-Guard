// // src/components/Navbar.js
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { HashLink } from "react-router-hash-link";
// import Login from "../pages/login"; // Import the Login component

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showLogin, setShowLogin] = useState(false); // State to control Login visibility

//   const toggleMenu = () => {
//     setIsOpen((prev) => !prev);
//   };

//   // Close the mobile menu when a link is clicked.
//   const handleLinkClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <motion.nav
//       className="navbar"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="navbar-left">
//         <h1>FillGuard</h1>
//       </div>

//       {/* Desktop Menu */}
//       <div className="navbar-right desktop-menu">
//         <Link to="/">Home</Link>
//         <Link to="/product">Product</Link>
//         {/* <Link to="/faq">FAQ</Link> */}
//         <HashLink smooth to="/#faq">
//           FAQ
//         </HashLink>
//         <Link to="/team">Team</Link>
//         <Link to="/shop">Shop</Link>
//         <Link to="/contact-us">Contact Us</Link>
//         {/* Login Button */}
//         <button onClick={() => setShowLogin(true)} className="btn-primary">
//           Log in
//         </button>
//       </div>

//       {/* Hamburger Icon for Mobile */}
//       <div className="mobile-menu-icon">
//         <button onClick={toggleMenu} aria-label="Toggle navigation">
//           {/* Simple Hamburger SVG Icon */}
//           <svg width="30" height="30" viewBox="0 0 30 30">
//             <path d="M0,5 30,5" stroke="#333" strokeWidth="3" />
//             <path d="M0,15 30,15" stroke="#333" strokeWidth="3" />
//             <path d="M0,25 30,25" stroke="#333" strokeWidth="3" />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu (animated) */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="mobile-menu"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Link onClick={handleLinkClick} to="/">
//               Home
//             </Link>
//             <Link onClick={handleLinkClick} to="/product">
//               Product
//             </Link>
//             {/* <Link onClick={handleLinkClick} to="/pricing-plans">
//               FAQ
//             </Link> */}
//             <HashLink smooth to="/#faq">
//               FAQ
//             </HashLink>
//             <Link onClick={handleLinkClick} to="/team">
//               Team
//             </Link>
//             <Link onClick={handleLinkClick} to="/shop">Shop</Link> 
//             <Link onClick={handleLinkClick} to="/contact-us">Contact Us</Link> 
//             <Link onClick={handleLinkClick} to="/shop">
//               Shop
//             </Link>
//             {/* Login Button in Mobile Menu */}
//             <button onClick={() => setShowLogin(true)} className="btn-primary">
//               Log in
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Render the Login component if showLogin is true */}
//       {showLogin && <Login onClose={() => setShowLogin(false)} />}
//     </motion.nav>
//   );
// }


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of LinkContainer
import { HashLink } from 'react-router-hash-link';

import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/img/Fill Guard Logo.png'; 

function AppNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states for cart & auth
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  // Logout handler
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Inline styles
  const styles = {
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
    },
    logoImage: {
      height: '40px', // Adjust height as needed
      width: 'auto',
      transition: 'filter 0.3s ease',
    },
    logoText: {
      position: 'absolute',
      left: '100%', // Position text to the right of the logo
      marginLeft: '10px', // Add some spacing between logo and text
      opacity: 0, // Initially hidden
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#fff',
      textShadow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.8)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    },
    logoContainerHover: {
      filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))', // Glow effect
    },
    logoTextHover: {
      opacity: 1, // Show text on hover
      transform: 'translateX(10px)', // Move text slightly to the right
    },
    // Add styles for dropdown items
    dropdownItem: {
      color: '#000 !important', // Force black text color with !important
    },
  };

  return (
    <Navbar style={{ backgroundColor: '#111' }} variant="dark" expand="lg" collapseOnSelect>
      <Container>
        {/* Brand with Logo and Text Animation */}
        <NavLink
          to="/"
          style={styles.logoContainer}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector('.logo-text').style.opacity = styles.logoTextHover.opacity;
            e.currentTarget.querySelector('.logo-text').style.transform = styles.logoTextHover.transform;
            e.currentTarget.querySelector('.logo-image').style.filter = styles.logoContainerHover.filter;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('.logo-text').style.opacity = styles.logoText.opacity;
            e.currentTarget.querySelector('.logo-text').style.transform = 'translateX(0)';
            e.currentTarget.querySelector('.logo-image').style.filter = 'none';
          }}
        >
          <img
            src={logo}
            alt="FillGuard Logo"
            style={styles.logoImage}
            className="logo-image"
          />
          <span style={styles.logoText} className="logo-text">
            FillGuard
          </span>
        </NavLink>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/* Fix for FAQ Link using pathname & hash */}
            <Nav.Link as={HashLink} to="/#faq" smooth>
              FAQ
            </Nav.Link>

            <Nav.Link as={NavLink} to="/product" activeClassName="active">
              Product
            </Nav.Link>

            <Nav.Link as={NavLink} to="/team" activeClassName="active">
              Team
            </Nav.Link>

            <Nav.Link as={NavLink} to="/shop" activeClassName="active">
              Shop
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact-us" activeClassName="active">
              Contact Us
            </Nav.Link>

            {/* Cart Link */}
            <Nav.Link as={NavLink} to="/cart" activeClassName="active">
              <FaShoppingCart /> Cart
              {cartItems.length > 0 && (
                <Badge pill bg="success" className="ms-1">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </Badge>
              )}
            </Nav.Link>

            {/* If user is logged in */}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <NavDropdown.Item as={NavLink} to="/profile" style={styles.dropdownItem}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/mydevices" style={styles.dropdownItem}>
                  My Devices
                </NavDropdown.Item>

                {/* Admin-only options inside user dropdown */}
                {userInfo.isAdmin && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/admin/userlist" style={styles.dropdownItem}>
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/admin/orderlist" style={styles.dropdownItem}>
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/admin/productlist" style={styles.dropdownItem}>
                      Products
                    </NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler} style={styles.dropdownItem}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login" activeClassName="active">
                <FaUser /> Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;