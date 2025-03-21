// // Dashboard.jsx

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, ProgressBar, Table, Form } from "react-bootstrap";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
// import { io } from "socket.io-client";
// import { useGetMyDevicesQuery } from "../slices/deviceApiSlice";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Dashboard = () => {
//   // Fetch user's devices using the device slice
//   const { data: devices, isLoading, error } = useGetMyDevicesQuery();
//   const [selectedDevice, setSelectedDevice] = useState("");

//   const [fillLevel, setFillLevel] = useState(0);
//   const [temperature, setTemperature] = useState(0);
//   const [humidity, setHumidity] = useState(0);
//   const [fillData, setFillData] = useState([]);
//   const [tempHumidityData, setTempHumidityData] = useState([]);
//   const [report, setReport] = useState({ avgTemp: 0, avgHumidity: 0, fillFrequency: 0 });

//   // State to track if the bin was previously above the 80% threshold
//   const [wasAboveThreshold, setWasAboveThreshold] = useState(false);

//   useEffect(() => {
//     // Only establish socket connection if a device is selected
//     if (!selectedDevice) return;

//     const socket = io("http://localhost:5002");

//     socket.on("sensorData", (data) => {
//       try {
//         // Only process data if it belongs to the selected device
//         if (selectedDevice && data.deviceId !== selectedDevice) return;

//         // Convert sensor values to numbers and validate
//         const binFillLevel = Number(data.binFillLevel);
//         const temperature = Number(data.temperature);
//         const humidity = Number(data.humidity);

//         if (isNaN(binFillLevel)) throw new Error("Invalid fillLevel");
//         if (isNaN(temperature)) throw new Error("Invalid temperature");
//         if (isNaN(humidity)) throw new Error("Invalid humidity");

//         setFillLevel(binFillLevel);
//         setTemperature(temperature);
//         setHumidity(humidity);

//         setFillData((prev) => [
//           ...prev.slice(-20),
//           { time: new Date().toLocaleTimeString(), fill: binFillLevel },
//         ]);

//         setTempHumidityData((prev) => [
//           ...prev.slice(-20),
//           { time: new Date().toLocaleTimeString(), temp: temperature, hum: humidity },
//         ]);

//         setReport((prev) => {
//           const newAvgTemp = (prev.avgTemp + temperature) / 2;
//           const newAvgHumidity = (prev.avgHumidity + humidity) / 2;
//           let newFillFrequency = prev.fillFrequency;

//           // Increment fill frequency when crossing above 80%
//           if (binFillLevel > 80 && !wasAboveThreshold) {
//             newFillFrequency += 1;
//             setWasAboveThreshold(true);
//           } else if (binFillLevel <= 80) {
//             setWasAboveThreshold(false);
//           }

//           return { avgTemp: newAvgTemp, avgHumidity: newAvgHumidity, fillFrequency: newFillFrequency };
//         });
//       } catch (err) {
//         console.error("❌ Error processing sensor data:", err);
//       }
//     });

//     return () => socket.disconnect();
//   }, [selectedDevice, wasAboveThreshold]);

//   return (
//     <Container className="mt-4 text-center">
//       <h1 className="mb-4">📊 FillGuard Dashboard</h1>

//       {/* Device Selection Dropdown */}
//       <Row className="justify-content-center mb-4">
//         <Col md={6}>
//           <Form.Group controlId="deviceSelect">
//             <Form.Label>Select Your IoT Device</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedDevice}
//               onChange={(e) => setSelectedDevice(e.target.value)}
//             >
//               <option value="">-- Select Device --</option>
//               {devices && devices.map((device) => (
//                 <option key={device._id} value={device._id}>
//                   {device.serialNumber} - {device.product && device.product.name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//         </Col>
//       </Row>

//       {selectedDevice ? (
//         <>
//           {/* Bin Fill Level */}
//           <Row className="justify-content-center mb-4">
//             <Col md={6}>
//               <Card className="p-4 shadow-lg">
//                 <h4 className="mb-3">🗑 Bin Fill Level</h4>
//                 <div
//                   className="position-relative d-flex justify-content-center align-items-center"
//                   style={{ height: "200px" }}
//                 >
//                   <div
//                     className="position-absolute bg-light rounded-circle"
//                     style={{
//                       width: "180px",
//                       height: "180px",
//                       border: "10px solid #007bff",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <h2 className="fw-bold">{fillLevel.toFixed(1)}%</h2>
//                   </div>
//                 </div>
//                 <ProgressBar now={fillLevel} variant="primary" className="mt-3" />
//               </Card>
//             </Col>
//           </Row>

//           {/* Temperature & Humidity Cards */}
//           <Row className="text-center mb-4">
//             <Col md={6}>
//               <Card className="p-4 shadow-lg bg-danger text-white">
//                 <h3>🌡 Temperature</h3>
//                 <h1 className="display-3 fw-bold">{temperature.toFixed(1)}°C</h1>
//               </Card>
//             </Col>
//             <Col md={6}>
//               <Card className="p-4 shadow-lg bg-info text-white">
//                 <h3>🌨️ Humidity</h3>
//                 <h1 className="display-3 fw-bold">{humidity.toFixed(1)}%</h1>
//               </Card>
//             </Col>
//           </Row>

//           {/* Graphs Section */}
//           <Row className="mb-4">
//             <Col md={6}>
//               <Card className="p-3 shadow-lg">
//                 <h4>🗑 Bin Fill Level</h4>
//                 <LineChart width={550} height={400} data={fillData}>
//                   <XAxis dataKey="time" />
//                   <YAxis />
//                   <Tooltip />
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <Line type="monotone" dataKey="fill" stroke="#007bff" />
//                 </LineChart>
//               </Card>
//             </Col>
//             <Col md={6}>
//               <Card className="p-3 shadow-lg">
//                 <h4>🌡 Temp & 💧 Humidity</h4>
//                 <LineChart width={550} height={400} data={tempHumidityData}>
//                   <XAxis dataKey="time" />
//                   <YAxis />
//                   <Tooltip />
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <Line type="monotone" dataKey="temp" stroke="#dc3545" />
//                   <Line type="monotone" dataKey="hum" stroke="#17a2b8" />
//                 </LineChart>
//               </Card>
//             </Col>
//           </Row>

//           {/* Reporting Section */}
//           <Row>
//             <Col md={12}>
//               <Card className="p-4 shadow-lg">
//                 <h4>📊 Daily Report</h4>
//                 <Table striped bordered hover className="mt-3">
//                   <thead>
//                     <tr>
//                       <th>Metric</th>
//                       <th>Value</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Average Temperature</td>
//                       <td>{report.avgTemp.toFixed(1)}°C</td>
//                     </tr>
//                     <tr>
//                       <td>Average Humidity</td>
//                       <td>{report.avgHumidity.toFixed(1)}%</td>
//                     </tr>
//                     <tr>
//                       <td>Bin Fill Frequency (Above 80%)</td>
//                       <td>{report.fillFrequency} times</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       ) : (
//         <Row className="justify-content-center">
//           <Col md={6}>
//             <p>Please select a device to view the dashboard.</p>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;

// MyDevices.jsx (or Dashboard.jsx)
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
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  // Fetch user's devices using the device slice
  const { data: devices, isLoading, error } = useGetMyDevicesQuery();
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

  // State to track if the bin was previously above the 80% threshold and to show alerts
  const [wasAboveThreshold, setWasAboveThreshold] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const alertThreshold = 80;

  useEffect(() => {
    // Only establish socket connection if a device is selected
    if (!selectedDevice) return;

    const socket = io("http://localhost:5002");

    socket.on("sensorData", (data) => {
      try {
        // Only process data if it belongs to the selected device
        if (selectedDevice && data.deviceId !== selectedDevice) return;

        // Convert sensor values to numbers
        const binFillLevel = Number(data.binFillLevel);
        const temp = Number(data.temperature);
        const hum = Number(data.humidity);

        if (isNaN(binFillLevel)) throw new Error("Invalid fillLevel");
        if (isNaN(temp)) throw new Error("Invalid temperature");
        if (isNaN(hum)) throw new Error("Invalid humidity");

        setFillLevel(binFillLevel);
        setTemperature(temp);
        setHumidity(hum);

        setFillData((prev) => [
          ...prev.slice(-20),
          { time: new Date().toLocaleTimeString(), fill: binFillLevel },
        ]);

        setTempHumidityData((prev) => [
          ...prev.slice(-20),
          { time: new Date().toLocaleTimeString(), temp: temp, hum: hum },
        ]);

        setReport((prev) => {
          const newAvgTemp = (prev.avgTemp + temp) / 2;
          const newAvgHumidity = (prev.avgHumidity + hum) / 2;
          let newFillFrequency = prev.fillFrequency;

          // Increment fill frequency and trigger alert when crossing above threshold
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

        //   // Update GPS coordinates if provided (and valid)
        //   if (data.latitude !== undefined && data.longitude !== undefined) {
        //     setGpsCoordinates({ latitude: data.latitude, longitude: data.longitude });
        //   }
        // } catch (err) {
        //   console.error("❌ Error processing sensor data:", err);
        // }
        // Update GPS coordinates only if provided and not both zero
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
