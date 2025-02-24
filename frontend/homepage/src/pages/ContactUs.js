import React, { useState } from "react";
import {
  Github,
  Linkedin,
  MessageSquare,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/ContactPage.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
      tempErrors.email = "Valid email required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="contact-container container-fluid py-5">
      <div className="container">
        <div className="row contact-content">
          <motion.div
            className="col-lg-6 col-md-12 contact-info"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="display-4 fw-bold"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="subtitle lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Feel free to reach out and discover how our IoT devices can
              transform your business. Let's connect and make your operations
              more efficient together! Ready to transform your waste management
              or industrial operations?
            </motion.p>

            <div className="contact-methods">
              <motion.div
                className="contact-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>contact@example.com</p>
                </div>
              </motion.div>

              <motion.div
                className="contact-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+1 (123) 456-7890</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="social-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3>Follow Us</h3>
              <div className="social-links">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github className="social-icon" size={24} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <Linkedin className="social-icon" size={24} />
                </motion.a>
                <motion.a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <MessageSquare className="social-icon" size={24} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="col-lg-6 col-md-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="display-5 fw-bold">Send a Message</h2>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? "error" : ""} ${formData.name ? "filled" : ""}`}
                  placeholder="Maxwell"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "error" : ""} ${formData.email ? "filled" : ""}`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`form-control ${formData.subject ? "filled" : ""}`}
                >
                  <option value="">Select a subject</option>
                  <option value="General">General Inquiry</option>
                  <option value="Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-control ${errors.message ? "error" : ""} ${formData.message ? "filled" : ""}`}
                  placeholder="Your message here..."
                  rows="5"
                />
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                className="submit-button btn btn-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
