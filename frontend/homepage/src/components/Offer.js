// src/components/Offer.js
import React from "react";
import { motion } from "framer-motion";
import secureI from "../assets/img/secure.jpg";
import orderI from "../assets/img/order.jpg";
import delivery from "../assets/img/delivery.png";
import customerS from "../assets/img/customer_support.jpg";

function Offer() {
  const offerItems = [
    {
        img: secureI,
        title: "Secure Online Shopping",
        description: "Purchase your IoT devices with ease and confidence through our secure platform.",
      },
      {
        img: orderI,
        title: "Seamless Ordering Process",
        description: "Experience a hassle-free checkout with quick and efficient processing.",
      },
      {
        img: customerS,
        title: "Reliable Customer Support",
        description: "Our dedicated support team is here to assist you with any inquiries about your orders.",
      },
      {
        img: delivery,
        title: "Fast and Safe Delivery",
        description: "Get your IoT devices delivered quickly and safely to your doorstep.",
      }
      
  ];

  return (
    <section className="offer">
      <h2 data-aos="fade-down">What We Offer</h2>
      <div className="offer-items">
        {offerItems.map((item, index) => (
          <motion.div
            className="offer-item"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.01, delay: index * 0.01 }}
            data-aos="fade-up"
          >
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Offer;
