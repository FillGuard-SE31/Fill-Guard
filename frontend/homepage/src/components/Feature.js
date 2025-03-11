// // src/components/Feature.js
// import React from "react";
// import { motion } from "framer-motion";
// import feature1 from "../assets/img/feature1.png"; // Replace with your image paths
// import feature2 from "../assets/img/feature2.png";
// import feature3 from "../assets/img/feature3.png";
// import feature4 from "../assets/img/feature4.png";

// const Feature = () => {
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
//   };

//   return (
//     <section className="feature-section">
//       <div className="container">
//         <h2 data-aos="fade-down" className="feature-heading text-center mb-5">Explore Our Features</h2>
//         <div className="row mb-5">
//           {/* Feature 1 */}
//           <div className="col-md-6 mb-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeInUp}
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               <div className="feature-card text-center">
//                 <img src={feature1} alt="Real-Time Bin Monitoring" className="feature-img" />
//                 <h3 className="feature-title">Real-Time Bin Monitoring</h3>
//                 <p className="feature-description">
//                   The web application will provide real-time updates on bin fill levels and, where
//                   applicable, environmental conditions such as temperature and humidity. For each
//                   bin, users can view current levels, helping them make timely decisions on waste
//                   collection, material replenishment, or environmental adjustments.
//                 </p>
//               </div>
//             </motion.div>
//           </div>

//           {/* Feature 2 */}
//           <div className="col-md-6 mb-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeInUp}
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               <div className="feature-card text-center">
//                 <img src={feature2} alt="Automated Notifications and Alerts" className="feature-img" />
//                 <h3 className="feature-title">Automated Notifications and Alerts</h3>
//                 <p className="feature-description">
//                   To prevent issues like overflow or material depletion, users can set customizable
//                   notification thresholds within the application. When a bin reaches a specified level or
//                   environmental conditions fluctuate beyond safe ranges, the system automatically
//                   sends alerts via email, SMS, or in-app notifications.
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         <div className="row">
//           {/* Feature 3 */}
//           <div className="col-md-6 mb-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeInUp}
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               <div className="feature-card text-center">
//                 <img src={feature3} alt="Data Analytics and Reporting Dashboard" className="feature-img" />
//                 <h3 className="feature-title">Data Analytics and Reporting Dashboard</h3>
//                 <p className="feature-description">
//                   The application will feature an analytics dashboard, where users can access
//                   historical data and trends for each monitored bin. By examining usage patterns over
//                   time, companies can identify peak times for waste generation or material usage,
//                   allowing them to refine their operations.
//                 </p>
//               </div>
//             </motion.div>
//           </div>

//           {/* Feature 4 */}
//           <div className="col-md-6 mb-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeInUp}
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               <div className="feature-card text-center">
//                 <img src={feature4} alt="Multi-Bin and Multi-Site Management" className="feature-img" />
//                 <h3 className="feature-title">Multi-Bin and Multi-Site Management</h3>
//                 <p className="feature-description">
//                   Organizations often operate across various locations, so the web application will
//                   support multi-site and multi-bin management. Users can register and monitor
//                   numerous bins across different facilities within a single platform. You can Easily manage and 
//                   monitor bins across multiple locations from one centralized platform.
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Feature;

// src/components/Feature.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import feature1 from '../assets/img/feature1.png';
import feature2 from '../assets/img/feature2.png';
import feature3 from '../assets/img/feature3.png';
import feature4 from '../assets/img/feature4.png';

const Feature = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const features = [
    {
      img: feature1,
      title: 'Real-Time Bin Monitoring',
      description:
        'The web application will provide real-time updates on bin fill levels and, where applicable, environmental conditions such as temperature and humidity. For each bin, users can view current levels, helping them make timely decisions on waste collection, material replenishment, or environmental adjustments.',
    },
    {
      img: feature2,
      title: 'Automated Notifications & Alerts',
      description:
        'To prevent issues like overflow or material depletion, users can set customizable notification thresholds within the application. When a bin reaches a specified level or environmental conditions fluctuate beyond safe ranges, the system automatically sends alerts via email, SMS, or in-app notifications.',
    },
    {
      img: feature3,
      title: 'Data Analytics & Reporting Dashboard',
      description:
        'The application will feature an analytics dashboard, where users can access historical data and trends for each monitored bin. By examining usage patterns over time, companies can identify peak times for waste generation or material usage, allowing them to refine their operations.',
    },
    {
      img: feature4,
      title: 'Multi-Bin & Multi-Site Management',
      description:
        'Organizations often operate across various locations, so the web application will support multi-site and multi-bin management. Users can register and monitor numerous bins across different facilities within a single platform. You can Easily manage and monitor bins across multiple locations from one centralized platform.',
    },
  ];

  return (
    <section className="feature-section my-5">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mb-5">Explore Our Features</h2>
          </Col>
        </Row>

        <Row>
          {features.map((feat, index) => (
            <Col md={6} className="mb-4 d-flex align-items-stretch" key={index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true, amount: 0.5 }}
                className="w-100"
              >
                <Card
                  className="feature-card text-center border-0 p-4 w-100"
                  style={{
                    height: "100%",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                >
                  <img
                    src={feat.img}
                    alt={feat.title}
                    className="mb-3"
                    style={{
                      width: "100px", // Increase image size
                      display: "block",
                      margin: "0 auto", // Center align the image
                    }}
                  />
                  <Card.Body>
                  <Card.Title
                      className="fw-bold"
                      style={{ fontSize: "1.25rem" }} // Larger title
                    >
                      {feat.title}
                    </Card.Title>
                    <Card.Text
                      className="text-muted"
                      style={{ fontSize: "1rem" }} // Larger description
                    >
                      {feat.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Inline CSS for hover effect */}
      <style>
        {`
          .feature-card:hover {
            box-shadow: 0px 8px 20px #ffc300 !important;
          }
        `}
      </style>
    </section>
  );
};

export default Feature;