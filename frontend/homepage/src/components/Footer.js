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
//         <p>© 2025 by SE-31. created with React</p>
//         <p>Contact: 123-456-7890 | FillGuard.com</p>
//         <div className="footer-socials">
//           <a href="#!">Instagram</a>
//           <a href="#!">X</a>
//           <a href="#!">Facebook</a>
//           <a href="https://youtube.com/@fillguard?si=QsRuzRDTWHMiBieR" target="_blank">YouTube</a>
//         </div>
//       </div>
//     </motion.footer>
//   );
// }

// export default Footer;


// src/components/Footer.js
import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="footer mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="footer-content">
        <p>© 2025 by SE-31.</p>
        <p>Contact: 123-456-7890 | FillGuard.com</p>
        <div className="footer-socials">
          <a href="https://www.instagram.com/fillguard/"target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://x.com/FillGuard"target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a href="https://facebook.com/FillGuard"target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://youtube.com/@fillguard?si=QsRuzRDTWHMiBieR" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;