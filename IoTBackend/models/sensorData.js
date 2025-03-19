// const mongoose = require("mongoose");

// const SensorDataSchema = new mongoose.Schema({
//   fillLevel: { type: Number, required: true },
//   temperature: { type: Number, required: true },
//   humidity: { type: Number, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const SensorData = mongoose.model("SensorData", SensorDataSchema);

// module.exports = SensorData;

import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Device" },
  fillLevel: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", SensorDataSchema);
export default SensorData;
