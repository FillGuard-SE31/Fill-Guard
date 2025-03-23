//IoTBackend/server.js
import "dotenv/config";
import mqtt from "mqtt";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import SensorData from "./models/sensorData.js";
import "./models/Database.js"; // Connects to MongoDB
import { checkAndNotifyBinFill } from "./controllers/notificationController.js";
import reportRoutes from "./routes/reportRoutes.js"; 

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", reportRoutes);

// Create HTTP server for WebSockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// HiveMQ Cloud MQTT Configuration
const MQTT_BROKER = process.env.MQTT_BROKER;
const MQTT_PORT = process.env.MQTT_PORT || 8883;
const MQTT_TOPIC = process.env.MQTT_TOPIC;
const MQTT_USER = process.env.MQTT_USER;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;

const mqttOptions = {
  port: MQTT_PORT,
  username: MQTT_USER,
  password: MQTT_PASSWORD,
};

const client = mqtt.connect(MQTT_BROKER, mqttOptions);

client.on("connect", () => {
  console.log(`✅ Connected to MQTT Broker: ${MQTT_BROKER}`);
  client.subscribe(MQTT_TOPIC, (err) => {
    if (err) console.error("❌ MQTT Subscription Error:", err);
  });
});

client.on("error", (err) => {
  console.error("❌ MQTT Connection Error:", err);
});

client.on("reconnect", () => {
  console.log("🔄 Reconnecting to MQTT...");
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    // Validate sensor data types
    if (
      typeof data.fillLevel !== "number" ||
      typeof data.temperature !== "number" ||
      typeof data.humidity !== "number"
    ) {
      throw new Error("Invalid sensor data: fillLevel, temperature, or humidity is not a number");
    }

    // Ensure that the MQTT payload includes the device identifier.
    if (!data.deviceId) {
      throw new Error("MQTT payload missing deviceId field");
    }

    // Construct payload mapping deviceId to the required 'device' field
    const sensorDataPayload = {
      device: data.deviceId,
      fillLevel: data.fillLevel,
      temperature: data.temperature,
      humidity: data.humidity,
      latitude: data.latitude,     // Save GPS latitude
      longitude: data.longitude,   // Save GPS longitude
    };

    // Save sensor data to MongoDB
    const newSensorData = new SensorData(sensorDataPayload);
    await newSensorData.save();

    console.log("📡 New Sensor Data:", sensorDataPayload);

    // Emit data to all connected WebSocket clients
    io.emit("sensorData", {
      binFillLevel: data.fillLevel,
      temperature: data.temperature,
      humidity: data.humidity,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: new Date().toLocaleTimeString(),
      deviceId: data.deviceId,
    });

    // Call the notification function to check and send an email if necessary
    await checkAndNotifyBinFill(data.deviceId, data.fillLevel);

  } catch (err) {
    console.error("❌ Error Processing MQTT Message:", err);
  }
});

// REST API Endpoints
app.get("/data", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(50);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
});

app.delete("/clear-data", async (req, res) => {
  try {
    await SensorData.deleteMany({});
    res.json({ message: "✅ Sensor data cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear data" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));