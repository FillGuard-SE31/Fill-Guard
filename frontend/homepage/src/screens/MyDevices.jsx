//frontend/homepage/src/screens/MyDevices.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Table,
  Form,
  Alert,
} from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { io } from "socket.io-client";
import { useGetMyDevicesQuery } from "../slices/deviceApiSlice";
import MapView from "../components/MapView";
import ReportDownload from "../components/ReportDownload";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const { data: devices } = useGetMyDevicesQuery();
  const [selectedDevice, setSelectedDevice] = useState("");

  const [fillLevel, setFillLevel] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [fillData, setFillData] = useState([]);
  const [tempHumidityData, setTempHumidityData] = useState([]);
  const [report, setReport] = useState({
    avgTemp: 0,
    avgHumidity: 0,
    fillFrequency: 0,
  });
  const [gpsCoordinates, setGpsCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const [wasAboveThreshold, setWasAboveThreshold] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const alertThreshold = 80;

  useEffect(() => {
    if (!selectedDevice) return;

    const socket = io("http://localhost:5002");

    socket.on("sensorData", (data) => {
      try {
        if (data.deviceId !== selectedDevice) return;

        const binFillLevel = Number(data.binFillLevel);
        const temp = Number(data.temperature);
        const hum = Number(data.humidity);

        if (isNaN(binFillLevel) || isNaN(temp) || isNaN(hum)) {
          throw new Error("Invalid sensor values");
        }

        setFillLevel(binFillLevel);
        setTemperature(temp);
        setHumidity(hum);

        setFillData((prev) => [
          ...prev.slice(-20),
          { time: new Date().toLocaleTimeString(), fill: binFillLevel },
        ]);

        setTempHumidityData((prev) => [
          ...prev.slice(-20),
          { time: new Date().toLocaleTimeString(), temp, hum },
        ]);

        setReport((prev) => {
          const newAvgTemp = (prev.avgTemp + temp) / 2;
          const newAvgHumidity = (prev.avgHumidity + hum) / 2;
          let newFillFrequency = prev.fillFrequency;

          if (binFillLevel > alertThreshold && !wasAboveThreshold) {
            newFillFrequency += 1;
            setWasAboveThreshold(true);
            setAlertVisible(true);
          } else if (binFillLevel <= alertThreshold) {
            setWasAboveThreshold(false);
            setAlertVisible(false);
          }

          return {
            avgTemp: newAvgTemp,
            avgHumidity: newAvgHumidity,
            fillFrequency: newFillFrequency,
          };
        });

        if (
          data.latitude !== undefined &&
          data.longitude !== undefined &&
          (Number(data.latitude) !== 0 || Number(data.longitude) !== 0)
        ) {
          setGpsCoordinates({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        }
      } catch (err) {
        console.error("❌ Error processing sensor data:", err);
      }
    });

    return () => socket.disconnect();
  }, [selectedDevice, wasAboveThreshold]);

  return (
    <Container className="mt-4 text-center">
      <h1 className="mb-4">📊 FillGuard Dashboard</h1>

      {/* Device Selection Dropdown */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form.Group controlId="deviceSelect">
            <Form.Label>Select Your IoT Device</Form.Label>
            <Form.Control
              as="select"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option value="">-- Select Device --</option>
              {devices &&
                devices.map((device) => (
                  <option key={device._id} value={device._id}>
                    {device.serialNumber} -{" "}
                    {device.product && device.product.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {alertVisible && (
        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <Alert
              variant="danger"
              onClose={() => setAlertVisible(false)}
              dismissible
            >
              <Alert.Heading>Critical Alert!</Alert.Heading>
              <p>The bin fill level has exceeded {alertThreshold}%!</p>
            </Alert>
          </Col>
        </Row>
      )}

      {selectedDevice ? (
        <>
          {/* Bin Fill Level */}
          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <Card className="p-4 shadow-lg">
                <h4 className="mb-3">🗑 Bin Fill Level</h4>
                <div
                  className="position-relative d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <div
                    className="position-absolute bg-light rounded-circle"
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "10px solid #007bff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h2 className="fw-bold">{fillLevel.toFixed(1)}%</h2>
                  </div>
                </div>
                <ProgressBar
                  now={fillLevel}
                  variant="primary"
                  className="mt-3"
                />
              </Card>
            </Col>
          </Row>

          {/* Temperature & Humidity Cards */}
          <Row className="text-center mb-4">
            <Col md={6}>
              <Card className="p-4 shadow-lg bg-danger text-white">
                <h3>🌡 Temperature</h3>
                <h1 className="display-3 fw-bold">
                  {temperature.toFixed(1)}°C
                </h1>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="p-4 shadow-lg bg-info text-white">
                <h3>🌨️ Humidity</h3>
                <h1 className="display-3 fw-bold">{humidity.toFixed(1)}%</h1>
              </Card>
            </Col>
          </Row>

          {/* Graphs Section */}
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
                      <td>Bin Fill Frequency (Above {alertThreshold}%)</td>
                      <td>{report.fillFrequency} times</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          {/* Map Section */}
          {gpsCoordinates.latitude && gpsCoordinates.longitude && (
            <Row className="mb-4">
              <Col md={12}>
                <Card className="p-4 shadow-lg">
                  <h4>📍 Real-Time Bin Location</h4>
                  <MapView
                    latitude={Number(gpsCoordinates.latitude)}
                    longitude={Number(gpsCoordinates.longitude)}
                  />
                </Card>
              </Col>
            </Row>
          )}

          {/* PDF Report Button */}
          <Row className="mb-4">
            <Col md={12} className="text-center">
              <ReportDownload />
            </Col>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center">
          <Col md={6}>
            <p>Please select a device to view the dashboard.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;

