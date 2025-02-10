import React from "react";
import { motion } from "framer-motion";
import "../styles/Team.css";
import "bootstrap/dist/css/bootstrap.min.css";
import p1 from "../assets/img/personimg1.jpg";

const teamMembers = [
  { id: 1, name: "Hansaja Fernando", role: "Group Leader", image: p1 },
  { id: 2, name: "Sahan Embogama", role: "Group Member", image: p1 },
  { id: 3, name: "Isuru Dissanayake", role: "Group Member", image: p1 },
  { id: 4, name: "Channaka Abeysinghe", role: "Group Member", image: p1 },
  { id: 5, name: "Deyanas Hashin", role: "Group Member", image: p1 },
  { id: 6, name: "Satheeth Mohammed", role: "Group Member", image: p1 },
];

const Team = () => {
  return (
    <section className="team-section" data-aos="fade-up">
      <div className="container">
        <h1 className="mb-4 text-primary" data-aos="fade-down">Meet Our Team</h1>
        <div className="row justify-content-center g-4">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: member.id * 0.2 }}
              data-aos="fade-up"
            >
              <div className="team-member">
                <img src={member.image} alt={member.name} className="team-img" />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
