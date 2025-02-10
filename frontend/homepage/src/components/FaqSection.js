import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import faqImage from "../assets/img/faq.jpg"; // Adjust path if needed

const faqData = [
  {
    question: "Where can I purchase the IoT devices?",
    answer:
      "You can purchase our IoT devices directly through our website. Visit the 'Shop' section to explore available products and place your order securely.",
  },
  {
    question: "Do I need any additional equipment to use the IoT device?",
    answer:
      "No, our IoT devices come fully equipped with all necessary components. However, you may need a stable Wi-Fi connection to access real-time data.",
  },
  {
    question: "How do I access the data from my IoT device?",
    answer:
      "You can access real-time data from your IoT device by logging into your account on our website. After purchasing a device, you'll receive login credentials to monitor data like temperature and distance.",
  },
  {
    question: "Is the IoT device safe for outdoor use?",
    answer:
      "Absolutely! Our IoT devices are housed in weatherproof enclosures, making them suitable for both indoor and outdoor environments.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards, bank transfers, and secure online payment gateways.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
    <section className="py-5 bg-white faq" data-aos="fade-up">
      
      <div className="container">
        <div className="text-center mb-4">
        <h2 id = "faq">Frequently Asked Questions</h2>
          <motion.img
            src={faqImage}
            alt="FAQ Icon"
            className="mb-3 img-fluid" 
            // Set the image to use the full width of its container, but never exceed 400px
            style={{ width: "100%", maxWidth: "400px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="accordion" id="faqAccordion">
          {faqData.map((item, index) => (
            <motion.div
              className="accordion-item"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              data-aos="fade-up"
            >
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${openIndex === index ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => toggleFaq(index)}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${openIndex === index ? "show" : ""}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;


