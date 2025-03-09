// // src/components/Footer.js
// import React from "react";
// import { motion } from "framer-motion";

// function Footer() {
//   return (
//     <motion.footer
//       className="footer mt-auto"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <div className="footer-content">
//         <p>© 2025 by SE-31.</p>
//         <p>Contact: 123-456-7890 | FillGuard.com</p>
//         <div className="footer-socials">
//           <a href="https://www.instagram.com/fillguard/"target="_blank" rel="noopener noreferrer">
//             Instagram
//           </a>
//           <a href="https://x.com/FillGuard"target="_blank" rel="noopener noreferrer">
//             X
//           </a>
//           <a href="https://facebook.com/FillGuard"target="_blank" rel="noopener noreferrer">
//             Facebook
//           </a>
//           <a href="https://youtube.com/@fillguard?si=QsRuzRDTWHMiBieR" target="_blank" rel="noopener noreferrer">
//             YouTube
//           </a>
//         </div>
//       </div>
//     </motion.footer>
//   );
// }

// export default Footer;

// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/App.css';

function Footer() {
  return (
    <motion.footer
      className="footer mt-auto py-4 bg-dark text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <Row className="text-center">
          <Col>
            <p>© 2025 by SE-31.</p>
            <p>Contact: 123-456-7890 | FillGuard.com</p>
            <div className="footer-socials d-flex justify-content-center gap-3">
              <a
                href="https://www.instagram.com/fillguard/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffc300" }}
              >
                Instagram
              </a>
              <a
                href="https://x.com/FillGuard"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffc300" }}
              >
                X
              </a>
              <a
                href="https://facebook.com/FillGuard"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffc300" }}
              >
                Facebook
              </a>
              <a
                href="https://youtube.com/@fillguard?si=QsRuzRDTWHMiBieR"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffc300" }}
              >
                YouTube
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.footer>
  );
}

export default Footer;