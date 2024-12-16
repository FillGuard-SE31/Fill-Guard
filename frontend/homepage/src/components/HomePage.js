import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            FillGuard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Store
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary" href="#">
                  Log In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Image Section */}
      <div className="container mt-4">
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <img
              src="pic1.png"
              alt="A waste bin monitoring system"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-4 mb-3">
            <img
              src="pic2.png"
              alt="Silos used for storage monitoring"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-4 mb-3">
            <img
              src="pic3.png"
              alt="Factory production line integration"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Features</h2>
          <ul className="list-unstyled text-center">
            <li>Real-Time Bin Monitoring</li>
            <li>Automated Notifications and Alerts</li>
            <li>Environmental Conditions Monitoring</li>
            <li>Data Analytics and Reporting Dashboard</li>
          </ul>
        </div>
      </section>

      {/* IoT Device Section */}
      <section className="iot-device py-5">
        <div className="container text-center">
          <h2 className="mb-4">Description About IoT Device</h2>
          <p className="lead">
            The IoT device is a compact, versatile solution designed to monitor
            bin fill levels and environmental conditions in real-time across
            industries like waste management, manufacturing, and agriculture.
          </p>
          <img
            src="IOTDevice.png"
            alt="IoT Device"
            className="img-fluid mb-3"
            style={{ maxWidth: "200px" }}
          />
          <div>
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <div className="chatbot fixed-bottom text-end m-3">
        <img
          src="chatbot.png"
          alt="Chat with us"
          style={{ width: "60px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default HomePage;
