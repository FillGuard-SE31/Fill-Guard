// //IoTBackend/controllers/pdfReportController.js
import PDFDocument from "pdfkit";
import SensorData from "../models/sensorData.js";
import Device from "../models/Device.js";

// Helper function to reverse geocode latitude/longitude using Google Geocoding API
const getLocation = async (latitude, longitude) => {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return "";
  }
};

export const generatePdfReport = async (req, res) => {
  try {
    // Get deviceId from query parameters (if provided)
    const { deviceId } = req.query;
    let sensorData;
    let deviceInfo = null;
    
    if (deviceId) {
      sensorData = await SensorData.find({ device: deviceId })
        .sort({ timestamp: -1 })
        .limit(50);
      deviceInfo = await Device.findById(deviceId);
    } else {
      sensorData = await SensorData.find().sort({ timestamp: -1 }).limit(50);
    }
    
    // Initialize summary statistics
    let totalFillLevel = 0;
    let totalTemperature = 0;
    let totalHumidity = 0;
    let fillFrequency = 0;
    let wasAboveThreshold = false;
    const alertThreshold = 80;
    
    sensorData.forEach((data) => {
      totalFillLevel += data.fillLevel;
      totalTemperature += data.temperature;
      totalHumidity += data.humidity;
      
      if (data.fillLevel > alertThreshold && !wasAboveThreshold) {
        fillFrequency += 1;
        wasAboveThreshold = true;
      } else if (data.fillLevel <= alertThreshold) {
        wasAboveThreshold = false;
      }
    });
    
    const count = sensorData.length;
    const avgFillLevel = count > 0 ? totalFillLevel / count : 0;
    const avgTemperature = count > 0 ? totalTemperature / count : 0;
    const avgHumidity = count > 0 ? totalHumidity / count : 0;
    
    // Extract the latest valid coordinates (ignoring 0,0) from sensorData
    let formattedLocation = "";
    for (const data of sensorData) {
      if (
        data.latitude !== undefined &&
        data.longitude !== undefined &&
        (Number(data.latitude) !== 0 || Number(data.longitude) !== 0)
      ) {
        formattedLocation = await getLocation(data.latitude, data.longitude);
        // If reverse geocoding fails, fallback to raw coordinates
        if (!formattedLocation) {
          formattedLocation = `Coordinates: (${data.latitude}, ${data.longitude})`;
        }
        break; // Stop after finding the first valid location
      }
    }
    
    // Create a new PDF document
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    
    const filename =
      deviceId && deviceInfo
        ? `sensor_report_${deviceInfo.serialNumber}.pdf`
        : "sensor_report.pdf";
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    
    // Pipe PDF output to response
    doc.pipe(res);
    
    // Title and header
    const reportTitle =
      deviceId && deviceInfo
        ? `IoT Sensor Data Report for Device: ${deviceInfo.serialNumber}`
        : "IoT Sensor Data Report";
    doc.fontSize(20).text(reportTitle, { align: "center" });
    doc.moveDown();
    
    // Report summary
    doc.fontSize(12).text(`Report Date: ${new Date().toLocaleString()}`);
    doc.moveDown();
    doc.text(`Total Records: ${count}`);
    doc.text(`Average Fill Level: ${avgFillLevel.toFixed(2)}%`);
    doc.text(`Average Temperature: ${avgTemperature.toFixed(2)}°C`);
    doc.text(`Average Humidity: ${avgHumidity.toFixed(2)}%`);
    doc.text(`Bin Fill Frequency (Above ${alertThreshold}%): ${fillFrequency} times`);
    doc.moveDown();
    
    // Include location (if available) before listing sensor data
    if (formattedLocation) {
      doc.fontSize(12).text(`Device Location: ${formattedLocation}`);
      doc.moveDown();
    }
    
    // Section header for detailed sensor records
    doc.fontSize(14).text("Recent Sensor Data:", { underline: true });
    doc.moveDown();
    
    // List each sensor data record (without per-record geocoding)
    sensorData.forEach((data) => {
      const dateStr = new Date(data.timestamp).toLocaleString();
      doc.fontSize(10).text(`Date: ${dateStr}`);
      
      if (data.fillLevel > alertThreshold) {
        doc.fillColor("red").text(`Fill Level: ${data.fillLevel}%`).fillColor("black");
      } else {
        doc.text(`Fill Level: ${data.fillLevel}%`);
      }
      
      doc.text(`Temperature: ${data.temperature}°C`);
      doc.text(`Humidity: ${data.humidity}%`);
      
      // Optionally, include raw coordinates per record if needed
      if (
        data.latitude !== undefined &&
        data.longitude !== undefined &&
        (Number(data.latitude) !== 0 || Number(data.longitude) !== 0)
      ) {
        doc.text(`Coordinates: (${data.latitude}, ${data.longitude})`);
      }
      doc.moveDown();
    });
    
    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error("Error generating PDF report:", error);
    res.status(500).json({ error: "Failed to generate PDF report" });
  }
};