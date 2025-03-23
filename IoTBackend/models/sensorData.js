//IoTBackend/models/sensorData.js
import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Device" },
  fillLevel: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  latitude: { type: Number },    // New field for GPS latitude
  longitude: { type: Number },   // New field for GPS longitude
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", SensorDataSchema);
export default SensorData;