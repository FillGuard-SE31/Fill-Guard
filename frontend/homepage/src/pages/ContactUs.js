//src/pages/ContactUs.js
import React, { useState } from "react";
import {
  Github,
  Linkedin,
  MessageSquare,
  Mail,
  Phone,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import "../styles/ContactPage.css";
import { toast } from "react-toastify";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.match(/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
      tempErrors.email = "Valid email required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.message || "Error sending message.");
    }
    setLoading(false);
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
              more efficient together! Ready to transform your waste management
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
                  <p>fillguard.iot@gmail.com</p>
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
                  <p>+94778367910</p>
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
                  href="https://wa.me/+94778367910"
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
                  className={`form-control ${errors.name ? "error" : ""}`}
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
                  className={`form-control ${errors.email ? "error" : ""}`}
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
                  className="form-control"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-control ${errors.message ? "error" : ""}`}
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
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "12px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  borderRadius: "30px",
                  fontSize: "18px",
                  width: "100%",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffc300")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
              >
                {loading ? (
                  <Loader className="loading-icon" size={20} />
                ) : (
                  "Send"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;