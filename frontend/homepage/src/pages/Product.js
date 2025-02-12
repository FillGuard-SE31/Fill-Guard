import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Product.css";
import iot1 from "../assets/img/IoTimg1.png";
import iot2 from "../assets/img/IoTimg2.png";
import iot3 from "../assets/img/IoTimg3.png";
import waste from "../assets/img/WasteSlide.jpg";
import industry from "../assets/img/FactorySlide.jpg";
import silo from "../assets/img/SiloSlide.jpg";

const images = [iot1, iot2, iot3];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Product = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-container">
      <motion.h1
        className="main-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        Our Product
      </motion.h1>

      {/* IoT Device Section */}
      <motion.section
        className="section iot-device"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text">
          <h2>Innovative IoT Solution for Smart Bin Management</h2>
          <p>
            Our IoT device, powered by the <strong>ESP32 Microcontroller</strong>, leverages advanced sensors such as the 
            <strong> HC-SR04 Ultrasonic Sensor</strong> for precise fill-level detection and the <strong>DHT-11 Temperature 
            and Humidity Sensor</strong> for environmental monitoring. Designed for seamless integration, this smart device 
            offers real-time data insights, optimizing waste collection and industrial operations.
          </p>
        </div>
        <motion.div
          className="image"
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={images[currentImage]} alt="IoT Device" />
        </motion.div>
      </motion.section>

      {/* Waste Management Section */}
      <motion.section
        className="section waste-management"
        style={{ backgroundColor: "#ffc300" }}
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="image">
          <img src={waste} alt="Waste Management" />
        </div>
        <div className="text">
          <h2>Revolutionizing Waste Management</h2>
          <p>
            Our smart bin solution enhances efficiency in waste collection by providing real-time fill level updates. 
            Municipalities and waste collection companies can reduce operational costs and optimize routes, minimizing 
            unnecessary pickups and environmental impact.
          </p>
          <ul>
            <li>Optimized waste collection schedules</li>
            <li>Reduced operational costs</li>
            <li>Eco-friendly waste management</li>
          </ul>
        </div>
      </motion.section>

      {/* Industrial Operations Section */}
      <motion.section
        className="section industrial-operations"
        style={{ backgroundColor: "white" }}
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text">
          <h2>Enhancing Industrial Efficiency</h2>
          <p>
            Industrial environments require precise material handling and inventory tracking. Our IoT device ensures 
            accurate monitoring of storage levels, improving workflow efficiency and minimizing material wastage.
          </p>
          <ul>
            <li>Real-time inventory tracking</li>
            <li>Automated refilling alerts</li>
            <li>Enhanced operational efficiency</li>
          </ul>
        </div>
        <div className="image">
          <img src={industry} alt="Industry Operations" />
        </div>
      </motion.section>

      {/* Silo Operations Section */}
      <motion.section
        className="section silo-operations"
        style={{ backgroundColor: "#ffc300" }}
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="image">
          <img src={silo} alt="Silo Operations" />
        </div>
        <div className="text">
          <h2>Optimizing Silo Operations</h2>
          <p>
            Our IoT device ensures efficient monitoring of silo storage levels, helping agribusinesses and industries 
            maintain optimal stock levels. With real-time alerts, businesses can prevent overflows and shortages.
          </p>
          <ul>
            <li>Accurate fill level monitoring</li>
            <li>Prevent material overflows</li>
            <li>Optimized supply chain management</li>
          </ul>
        </div>
      </motion.section>
    </div>
  );
};

export default Product;
