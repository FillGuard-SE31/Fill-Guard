// backend/models/Device.js
import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  order: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Order" },
  serialNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;
