// require("dotenv").config();
// const mqtt = require("mqtt");
// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");

// const SensorData = require("./models/sensorData");
// require("./models/database"); // Connects to MongoDB


// // Initialize Express app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Create HTTP server for WebSockets
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // // Connect to MongoDB Atlas
// // const MONGO_URI = process.env.MONGO_URI;
// // if (!MONGO_URI) {
// //   console.error("❌ MongoDB URI is missing in .env file");
// //   process.exit(1);
// // }

// // mongoose
// //   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log("✅ Connected to MongoDB Atlas"))
// //   .catch((err) => {
// //     console.error("❌ MongoDB Connection Error:", err);
// //     process.exit(1);
// //   });

// // // Define Sensor Data Schema
// // const SensorDataSchema = new mongoose.Schema({
// //   fillLevel: Number,
// //   temperature: Number,
// //   humidity: Number,
// //   timestamp: { type: Date, default: Date.now },
// // });

// // const SensorData = mongoose.model("SensorData", SensorDataSchema);

// // MQTT Configuration
// const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://broker.hivemq.com";
// const MQTT_TOPIC = process.env.MQTT_TOPIC || "fillguard/sensorData";

// const client = mqtt.connect(MQTT_BROKER);

// client.on("connect", () => {
//   console.log(`✅ Connected to MQTT Broker: ${MQTT_BROKER}`);
//   client.subscribe(MQTT_TOPIC, (err) => {
//     if (err) console.error("❌ MQTT Subscription Error:", err);
//   });
// });

// client.on("error", (err) => {
//   console.error("❌ MQTT Connection Error:", err);
// });

// client.on("reconnect", () => {
//   console.log("🔄 Reconnecting to MQTT...");
// });

// client.on("message", async (topic, message) => {
//   try {
//     const data = JSON.parse(message.toString());

//     // Save data to MongoDB Atlas
//     const newSensorData = new SensorData(data);
//     await newSensorData.save();

//     console.log("📡 New Sensor Data:", data);

//     // Emit data to all connected WebSocket clients
//     io.emit("sensorData", {
//       binFillLevel: data.fillLevel.toFixed(1),
//       temperature: data.temperature.toFixed(1),
//       humidity: data.humidity.toFixed(1),
//       timestamp: new Date().toLocaleTimeString(),
//     });
//   } catch (err) {
//     console.error("❌ Error Processing MQTT Message:", err);
//   }
// });

// // REST API Endpoints
// app.get("/data", async (req, res) => {
//   try {
//     const data = await SensorData.find().sort({ timestamp: -1 }).limit(50);
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch sensor data" });
//   }
// });

// // Clear old sensor data (optional)
// app.delete("/clear-data", async (req, res) => {
//   try {
//     await SensorData.deleteMany({});
//     res.json({ message: "✅ Sensor data cleared" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to clear data" });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


require("dotenv").config();
const mqtt = require("mqtt");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const SensorData = require("./models/sensorData");
require("./models/database"); // Connects to MongoDB

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

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

    // Validate data
    if (
      typeof data.fillLevel !== "number" ||
      typeof data.temperature !== "number" ||
      typeof data.humidity !== "number"
    ) {
      throw new Error("Invalid sensor data: fillLevel, temperature, or humidity is not a number");
    }

    // Save data to MongoDB
    const newSensorData = new SensorData(data);
    await newSensorData.save();

    console.log("📡 New Sensor Data:", data);

    // Emit data to all connected WebSocket clients
    io.emit("sensorData", {
      binFillLevel: data.fillLevel,
      temperature: data.temperature,
      humidity: data.humidity,
      timestamp: new Date().toLocaleTimeString(),
    });
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