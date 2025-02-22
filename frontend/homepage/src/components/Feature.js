// src/components/Feature.js
import React from "react";
import { motion } from "framer-motion";
import feature1 from "../assets/img/feature1.png"; // Replace with your image paths
import feature2 from "../assets/img/feature2.png";
import feature3 from "../assets/img/feature3.png";
import feature4 from "../assets/img/feature4.png";

const Feature = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="feature-section">
      <div className="container">
        <h2 data-aos="fade-down" className="feature-heading text-center mb-5">Explore Our Features</h2>
        <div className="row mb-5">
          {/* Feature 1 */}
          <div className="col-md-6 mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="feature-card text-center">
                <img src={feature1} alt="Real-Time Bin Monitoring" className="feature-img" />
                <h3 className="feature-title">Real-Time Bin Monitoring</h3>
                <p className="feature-description">
                  The web application will provide real-time updates on bin fill levels and, where
                  applicable, environmental conditions such as temperature and humidity. For each
                  bin, users can view current levels, helping them make timely decisions on waste
                  collection, material replenishment, or environmental adjustments.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-6 mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="feature-card text-center">
                <img src={feature2} alt="Automated Notifications and Alerts" className="feature-img" />
                <h3 className="feature-title">Automated Notifications and Alerts</h3>
                <p className="feature-description">
                  To prevent issues like overflow or material depletion, users can set customizable
                  notification thresholds within the application. When a bin reaches a specified level or
                  environmental conditions fluctuate beyond safe ranges, the system automatically
                  sends alerts via email, SMS, or in-app notifications.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="row">
          {/* Feature 3 */}
          <div className="col-md-6 mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="feature-card text-center">
                <img src={feature3} alt="Data Analytics and Reporting Dashboard" className="feature-img" />
                <h3 className="feature-title">Data Analytics and Reporting Dashboard</h3>
                <p className="feature-description">
                  The application will feature an analytics dashboard, where users can access
                  historical data and trends for each monitored bin. By examining usage patterns over
                  time, companies can identify peak times for waste generation or material usage,
                  allowing them to refine their operations.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feature 4 */}
          <div className="col-md-6 mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="feature-card text-center">
                <img src={feature4} alt="Multi-Bin and Multi-Site Management" className="feature-img" />
                <h3 className="feature-title">Multi-Bin and Multi-Site Management</h3>
                <p className="feature-description">
                  Organizations often operate across various locations, so the web application will
                  support multi-site and multi-bin management. Users can register and monitor
                  numerous bins across different facilities within a single platform. You can Easily manage and 
                  monitor bins across multiple locations from one centralized platform.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;