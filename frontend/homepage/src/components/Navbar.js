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

// export default Navbar;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

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

  return (
    <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
      <Container>
        {/* Brand */}
        <LinkContainer to="/">
          <Navbar.Brand>FillGuard</Navbar.Brand>
        </LinkContainer>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/* Fix for FAQ Link using pathname & hash */}
            <Nav.Link href="/#faq">FAQ</Nav.Link>

            <LinkContainer to="/product">
              <Nav.Link>Product</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/team">
              <Nav.Link>Team</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>Shop</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact-us">
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>

            {/* Cart Link */}
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" className="ms-1">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* If user is logged in */}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/mydevices">
                  <NavDropdown.Item>My Devices</NavDropdown.Item>
                </LinkContainer>

                {/* Admin-only options inside user dropdown */}
                {userInfo.isAdmin && (
                  <>
                    <NavDropdown.Divider />
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;