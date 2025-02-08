// import React from "react";
// import HomePage from "./components/HomePage";

// function App() {
//   return (
//     <div>
//       <HomePage />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Footer from "./components/Footer";



import "./styles/App.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    duration: 0.5,
  };

  return (
    <div className={`app ${isLoaded ? "loaded" : "loading"}`}>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
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
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
