import React from "react";
import { motion } from "framer-motion";
import challengeImage from "../assets/img/challenge-image.png"; // Replace with your image path
import solutionImage from "../assets/img/solution-image.png"; // Replace with your image path

const ChallengeSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="challenge-section">
      <div className="container pt-5">
        {/* First Topic: Challenges */}
        <div className="row align-items-center mb-5">
          {/* Left Side: Challenge Image */}
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12 text-center"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.5 }}
          >
            <img src={challengeImage} alt="Challenges in Bin Management" className="img-fluid" />
          </motion.div>

          {/* Right Side: Challenge Content */}
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="challenge-topic">
              Challenges in Bin Management Across Industries
            </h2>
            <p className="challenge-description">
              Inefficient bin management causes significant challenges across waste management, manufacturing, and agriculture, leading to environmental, economic, and operational issues. In urban waste management, fixed collection schedules result in overflowing bins or unnecessary pickups, increasing pollution, health risks, and carbon emissions. Manufacturing suffers from raw material shortages due to manual bin monitoring, causing costly downtime and supply chain delays. In agriculture, inadequate storage monitoring leads to post-harvest losses, with mold and spoilage reducing food availability and increasing waste. Addressing these issues requires real-time monitoring solutions that optimize operations, reduce costs, and promote sustainability.
            </p>
          </motion.div>
        </div>

        {/* Second Topic: Solutions */}
        <div className="row align-items-center">
          {/* Left Side: Solution Content */}
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12 order-lg-1 order-md-1 order-sm-2"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="challenge-topic">
              Optimizing Resource Management & Waste Management with Intelligent Bin Monitoring Solutions
            </h2>
            <p className="challenge-description">
              Our cutting-edge intelligent bin monitoring system leverages IoT and real-time analytics to revolutionize resource management. Equipped with high-precision ultrasonic sensors for fill-level detection and environmental sensors for temperature and humidity monitoring, this state-of-the-art solution ensures seamless operational efficiency. Data is continuously transmitted to a secure cloud-based platform, where advanced analytics transform raw information into actionable insights. A dynamic, user-friendly dashboard empowers users to oversee multiple bins across locations, receive instant alerts, and optimize decision-making with in-depth analytics. By predicting waste accumulation trends and environmental factors, this innovative system helps prevent overflow incidents, eliminates production bottlenecks, and minimizes waste.
            </p>
          </motion.div>

          {/* Right Side: Solution Image */}
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12 text-center order-lg-2 order-md-2 order-sm-1"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.5 }}
          >
            <img src={solutionImage} alt="Intelligent Bin Monitoring Solutions" className="img-fluid" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;