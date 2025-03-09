// import React from 'react';

// const MyDevices = () => {
//   return (
//     <div className="container mt-4">
//       <h1>This is my devices page</h1>
//       <p>Here, you will be able to view and manage all your connected FillGuard IoT devices.</p>
//     </div>
//   );
// };

// export default MyDevices;

// Fill-Guard Dashboard

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ProgressBar, Table } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [fillLevel, setFillLevel] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [fillData, setFillData] = useState([]);
  const [tempHumidityData, setTempHumidityData] = useState([]);
  const [report, setReport] = useState({ avgTemp: 0, avgHumidity: 0, fillFrequency: 0 });

  useEffect(() => {
    const socket = io("http://localhost:5002");

    socket.on("sensorData", (data) => {
      try {
        // Ensure fillLevel, temperature, and humidity are numbers
        const binFillLevel = Number(data.binFillLevel);
        const temperature = Number(data.temperature);
        const humidity = Number(data.humidity);
  
        if (isNaN(binFillLevel)) throw new Error("Invalid fillLevel");
        if (isNaN(temperature)) throw new Error("Invalid temperature");
        if (isNaN(humidity)) throw new Error("Invalid humidity");
  
        setFillLevel(binFillLevel);
        setTemperature(temperature);
        setHumidity(humidity);
  
        setFillData((prev) => [
          ...prev.slice(-20),
          { time: new Date().toLocaleTimeString(), fill: binFillLevel },
        ]);
  
        setTempHumidityData((prev) => [
          ...prev.slice(-20),
          { time: new Date().toLocaleTimeString(), temp: temperature, hum: humidity },
        ]);
  
        setReport((prev) => {
          const newAvgTemp = (prev.avgTemp + temperature) / 2;
          const newAvgHumidity = (prev.avgHumidity + humidity) / 2;
          const newFillFrequency = prev.fillFrequency + (binFillLevel > 80 ? 1 : 0);
  
          return { avgTemp: newAvgTemp, avgHumidity: newAvgHumidity, fillFrequency: newFillFrequency };
        });
      } catch (err) {
        console.error("❌ Error processing sensor data:", err);
      }
    });
  
    return () => socket.disconnect();
  }, []);

  return (
    <Container className="mt-4 text-center">
      <h1 className="mb-4">📊 FillGuard Dashboard</h1>
      
      {/* Bin Fill Level Circle */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Card className="p-4 shadow-lg">
            <h4 className="mb-3">🗑 Bin Fill Level</h4>
            <div className="position-relative d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="position-absolute bg-light rounded-circle" style={{ width: "180px", height: "180px", border: "10px solid #007bff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h2 className="fw-bold">{fillLevel.toFixed(1)}%</h2>
              </div>
            </div>
            <ProgressBar now={fillLevel} variant="primary" className="mt-3" />
          </Card>
        </Col>
      </Row>

      {/* Temperature & Humidity */}
      <Row className="text-center mb-4">
        <Col md={6}>
          <Card className="p-4 shadow-lg bg-danger text-white">
            <h3>🌡 Temperature</h3>
            <h1 className="display-3 fw-bold">{temperature.toFixed(1)}°C</h1>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow-lg bg-info text-white">
            <h3>🌨️ Humidity</h3>
            <h1 className="display-3 fw-bold">{humidity.toFixed(1)}%</h1>
          </Card>
        </Col>
      </Row>

      {/* Graphs */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3 shadow-lg">
            <h4>🗑 Bin Fill Level</h4>
            <LineChart width={550} height={400} data={fillData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="fill" stroke="#007bff" />
            </LineChart>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 shadow-lg">
            <h4>🌡 Temp & 💧 Humidity</h4>
            <LineChart width={550} height={400} data={tempHumidityData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="temp" stroke="#dc3545" />
              <Line type="monotone" dataKey="hum" stroke="#17a2b8" />
            </LineChart>
          </Card>
        </Col>
      </Row>

      {/* Reporting Section */}
      <Row>
        <Col md={12}>
          <Card className="p-4 shadow-lg">
            <h4>📊 Daily Report</h4>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Average Temperature</td>
                  <td>{report.avgTemp.toFixed(1)}°C</td>
                </tr>
                <tr>
                  <td>Average Humidity</td>
                  <td>{report.avgHumidity.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>Bin Fill Frequency (Above 80%)</td>
                  <td>{report.fillFrequency} times</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
