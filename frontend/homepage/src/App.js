//src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ChatBot from "./components/ChatBot";
import AOS from "aos";
import "aos/dist/aos.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";  

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ChallengeSection from "./components/ChallengeSection";
import Feature from "./components/Feature";
import Offer from "./components/Offer";
import FaqSection from "./components/FaqSection";

// FillGuard Pages
import Team from "./pages/Team";
import ProductPage from "./pages/Product";
import Shop from "./pages/Shop";
import ContactPage from "./pages/ContactUs";

// eCommerce Screens
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen"; // Route for individual product details
import MyDevices from "./screens/MyDevices"; // Route for My Devices page

// Admin Screens
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";

// New Forgot & Reset Password Screens
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

// Route Guards
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};
const pageTransition = { duration: 0.5 };

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  // Dismiss active toasts on route change
  useEffect(() => {
    toast.dismiss();
  }, [location]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": "PAYPAL_CLIENT_ID", currency: "USD" }}>
      <ToastContainer autoClose={5000} />
      <div className={`min-vh-100 app ${isLoaded ? "loaded" : "loading"}`}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Hero />
                  <ChallengeSection />
                  <Feature />
                  <Offer />
                  <FaqSection />
                </motion.div>
              }
            />

            {/* Additional FillGuard Pages */}
            <Route
              path="/team"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Team />
                </motion.div>
              }
            />
            <Route
              path="/product"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProductPage />
                </motion.div>
              }
            />
            {/* Route for individual product details */}
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route
              path="/shop"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Shop />
                </motion.div>
              }
            />
            <Route
              path="/contact-us"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ContactPage />
                </motion.div>
              }
            />

            {/* eCommerce Routes */}
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* New Forgot & Reset Password Routes */}
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/reset-password/:token" element={<ResetPasswordScreen />} />

            {/* Private / Authenticated Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/mydevices" element={<MyDevices />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/orderlist" element={<OrderListScreen />} />
              <Route path="/admin/productlist" element={<ProductListScreen />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            </Route>
          </Routes>
        </AnimatePresence>
        <ChatBot />
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;