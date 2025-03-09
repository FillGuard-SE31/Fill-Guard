// // src/components/Offer.js
// import React from "react";
// import { motion } from "framer-motion";
// import secureI from "../assets/img/secure.jpg";
// import orderI from "../assets/img/order.jpg";
// import delivery from "../assets/img/delivery.png";
// import customerS from "../assets/img/customer_support.jpg";

// function Offer() {
//   const offerItems = [
//     {
//         img: secureI,
//         title: "Secure Online Shopping",
//         description: "Purchase your IoT devices with ease and confidence through our secure platform.",
//       },
//       {
//         img: orderI,
//         title: "Seamless Ordering Process",
//         description: "Experience a hassle-free checkout with quick and efficient processing.",
//       },
//       {
//         img: customerS,
//         title: "Reliable Customer Support",
//         description: "Our dedicated support team is here to assist you with any inquiries about your orders.",
//       },
//       {
//         img: delivery,
//         title: "Fast and Safe Delivery",
//         description: "Get your IoT devices delivered quickly and safely to your doorstep.",
//       }
      
//   ];

//   return (
//     <section className="offer">
//       <h2 data-aos="fade-down">Discover What We Offer</h2>
//       <div className="offer-items">
//         {offerItems.map((item, index) => (
//           <motion.div
//             className="offer-item"
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.01, delay: index * 0.01 }}
//             data-aos="fade-up"
//           >
//             <img src={item.img} alt={item.title} />
//             <h4>{item.title}</h4>
//             <p>{item.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Offer;

// src/components/Offer.jsx
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import secureI from '../assets/img/secure.jpg';
import orderI from '../assets/img/order.jpg';
import delivery from '../assets/img/delivery.png';
import customerS from '../assets/img/customer_support.jpg';

function Offer() {
  const offerItems = [
    {
      img: secureI,
      title: 'Secure Online Shopping',
      description:
        'Purchase your IoT devices with ease and confidence through our secure platform.',
    },
    {
      img: orderI,
      title: 'Seamless Ordering Process',
      description:
        'Experience a hassle-free checkout with quick and efficient processing.',
    },
    {
      img: customerS,
      title: 'Reliable Customer Support',
      description:
        'Our dedicated support team is here to assist you with any inquiries about your orders.',
    },
    {
      img: delivery,
      title: 'Fast and Safe Delivery',
      description:
        'Get your IoT devices delivered quickly and safely to your doorstep.',
    },
  ];

  return (
    <section className="my-5" data-aos="fade-down">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mb-4">Discover What We Offer</h2>
          </Col>
        </Row>

        <Row>
          {offerItems.map((item, index) => (
            <Col md={3} key={index} className="mb-4">
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0px 10px 20px rgba(255, 195, 0, 0.5)', // Increase spread and opacity
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-aos="fade-up"
                className="p-3 text-center h-100"
                style={{  borderRadius: '8px', 
                          backgroundColor: '#fff',
                          transition: 'all 0.3s ease'}}  //smooth transition for box shadow
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fluid
                  className="mb-3"
                  style={{ maxHeight: '180px', objectFit: 'cover' }}
                />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Offer;