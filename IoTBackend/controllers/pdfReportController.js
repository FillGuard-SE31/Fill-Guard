//IoTBackend/controllers/pdfReportController.js
import PDFDocument from "pdfkit";
import SensorData from "../models/sensorData.js";

export const generatePdfReport = async (req, res) => {
  try {
    // Optionally, add filtering (by device, date range, etc.)
    // For this example, we retrieve the latest 50 sensor data records.
    const sensorData = await SensorData.find().sort({ timestamp: -1 }).limit(50);

    // Calculate summary statistics.
    let totalFillLevel = 0;
    let totalTemperature = 0;
    let totalHumidity = 0;

    sensorData.forEach((data) => {
      totalFillLevel += data.fillLevel;
      totalTemperature += data.temperature;
      totalHumidity += data.humidity;
    });

    const count = sensorData.length;
    const avgFillLevel = count > 0 ? totalFillLevel / count : 0;
    const avgTemperature = count > 0 ? totalTemperature / count : 0;
    const avgHumidity = count > 0 ? totalHumidity / count : 0;

    // Create a new PDF document.
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="sensor_report.pdf"');

    // Pipe the PDF document to the response.
    doc.pipe(res);

    // Add a title and header.
    doc.fontSize(20).text("IoT Sensor Data Report", { align: "center" });
    doc.moveDown();

    // Report summary.
    doc.fontSize(12).text(`Report Date: ${new Date().toLocaleString()}`);
    doc.moveDown();
    doc.text(`Total Records: ${count}`);
    doc.text(`Average Fill Level: ${avgFillLevel.toFixed(2)}%`);
    doc.text(`Average Temperature: ${avgTemperature.toFixed(2)}°C`);
    doc.text(`Average Humidity: ${avgHumidity.toFixed(2)}%`);
    doc.moveDown();

    // Section header for detailed records.
    doc.fontSize(14).text("Recent Sensor Data:", { underline: true });
    doc.moveDown();

    // Loop through the sensor data records.
    sensorData.forEach((data) => {
      const dateStr = new Date(data.timestamp).toLocaleString();
      doc.fontSize(10).text(`Date: ${dateStr}`);
      doc.text(`Fill Level: ${data.fillLevel}%`);
      doc.text(`Temperature: ${data.temperature}°C`);
      doc.text(`Humidity: ${data.humidity}%`);
      if (data.latitude !== undefined && data.longitude !== undefined) {
        doc.text(`Location: (${data.latitude}, ${data.longitude})`);
      }
      doc.moveDown();
    });

    // Finalize the PDF and end the stream.
    doc.end();
  } catch (error) {
    console.error("Error generating PDF report:", error);
    res.status(500).json({ error: "Failed to generate PDF report" });
  }
};