import React from "react";
import { motion } from "framer-motion";
import "../styles/Team.css";
import "bootstrap/dist/css/bootstrap.min.css";
import p1 from "../assets/img/Dulan.jpg";
import p2 from "../assets/img/Sahan.jpg";
import p3 from "../assets/img/isuruDissanayake.jpg";
import p4 from "../assets/img/Channaka.jpeg";
import p5 from "../assets/img/Deyanas.jpg";
import p6 from "../assets/img/Satheeth.JPG";

const teamMembers = [
  { id: 1, name: "Hansaja Fernando", role: "About Me", image: p1, linkedin: "https://www.linkedin.com/in/dulan-fernando-650724267" },
  { id: 2, name: "Sahan Embogama", role: "About Me", image: p2, linkedin: "https://www.linkedin.com/in/sahan-embogama-82475b2b5" },
  { id: 3, name: "Isuru Dissanayake", role: "About Me", image: p3, linkedin: "https://www.linkedin.com/in/isuru-dissanayake-9148802aa" },
  { id: 4, name: "Channaka Abeysinghe", role: "About Me", image: p4, linkedin: "https://www.linkedin.com/in/channaka-abeysinghe" },
  { id: 5, name: "Deyanas Hashin", role: "About Me", image: p5, linkedin: "https://www.linkedin.com/in/deyanas-hashin-68427b2a7" },
  { id: 6, name: "Satheeth Mohammed", role: "About Me", image: p6, linkedin: "https://www.linkedin.com/in/satheeth-mohammed-84681a304" },
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
                  <p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="role-link"
                    >
                      {member.role}
                    </a>
                  </p>
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