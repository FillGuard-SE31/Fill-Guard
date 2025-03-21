// // IoTBackend/controllers/notificationController.js
// import nodemailer from 'nodemailer';
// import Device from '../models/Device.js'; 
// import User from '../models/userModel.js'; 

// // Cache the transporter so it's not re-created every time
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // In-memory store to track if a notification was sent for a given device
// const notificationStatus = {};

// /**
//  * Sends an email notification when the bin fill level reaches or exceeds 80%.
//  *
//  * @param {string} userEmail - The recipient's email address.
//  * @param {string} deviceId - The device ID.
//  * @param {number} fillLevel - The current fill level percentage.
//  */
// const sendNotificationEmail = async (userEmail, deviceId, fillLevel) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: 'Bin Fill Level Alert',
//       text: `Alert: Your bin (Device ID: ${deviceId}) has reached a fill level of ${fillLevel}%. Please take appropriate action.`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${userEmail} for device ${deviceId}.`);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// /**
//  * Checks the bin fill level and sends a notification email once when the level
//  * is 80% or above. If the level drops below 80%, the notification flag is reset.
//  *
//  * @param {string} deviceId - The device ID.
//  * @param {number} fillLevel - The current fill level percentage.
//  */
// export const checkAndNotifyBinFill = async (deviceId, fillLevel) => {
//   if (fillLevel >= 80) {
//     // Only send an email if one has not already been sent for this high fill level
//     if (!notificationStatus[deviceId]) {
//       try {
//         // Find the device and populate the associated user
//         const device = await Device.findById(deviceId).populate('user');
//         if (!device) {
//           console.error(`Device not found: ${deviceId}`);
//           return;
//         }
//         if (!device.user || !device.user.email) {
//           console.error(`User data missing or email not found for device: ${deviceId}`);
//           return;
//         }

//         const userEmail = device.user.email;
//         await sendNotificationEmail(userEmail, deviceId, fillLevel);
//         // Mark notification as sent for this device
//         notificationStatus[deviceId] = true;
//       } catch (error) {
//         console.error(`Error processing notification for device ${deviceId}:`, error);
//       }
//     }
//   } else {
//     // Reset the notification flag if fill level is below 80%
//     notificationStatus[deviceId] = false;
//   }
// };

// IoTBackend/controllers/notificationController.js
import nodemailer from 'nodemailer';
import Device from '../models/Device.js';
import User from '../models/userModel.js';
import SensorData from '../models/sensorData.js';

// If needed, uncomment the next line for Node versions that lack a global fetch:
// import fetch from 'node-fetch';

// Cache the transporter so it's not re-created every time
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// In-memory store to track if a notification was sent for a given device
const notificationStatus = {};

/**
 * Reverse geocodes latitude and longitude to get a formatted address.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<string>} Formatted address or empty string if not found.
 */
const getLocation = async (latitude, longitude) => {
  // Ensure that a valid API key is provided in your environment variables
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

/**
 * Sends an email notification when the bin fill level reaches or exceeds 80%.
 *
 * @param {string} userEmail - The recipient's email address.
 * @param {string} deviceId - The device ID.
 * @param {number} fillLevel - The current fill level percentage.
 * @param {string} deviceSerial - The serial number of the device.
 * @param {string} locationInfo - The formatted location address (if available).
 */
const sendNotificationEmail = async (userEmail, deviceId, fillLevel, deviceSerial, locationInfo) => {
  try {
    let text = `Alert: Your bin (Device ID: ${deviceId}, Serial Number: ${deviceSerial}) has reached a fill level of ${fillLevel}%.`;
    if (locationInfo) {
      text += ` Exact Location: ${locationInfo}`;
    }
    text += " Please take appropriate action.";
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Bin Fill Level Alert',
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail} for device ${deviceId}.`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

/**
 * Checks the bin fill level and sends a notification email once when the level
 * is 80% or above. If the level drops below 80%, the notification flag is reset.
 *
 * @param {string} deviceId - The device ID.
 * @param {number} fillLevel - The current fill level percentage.
 */
// export const checkAndNotifyBinFill = async (deviceId, fillLevel) => {
//   if (fillLevel >= 80) {
//     // Only send an email if one has not already been sent for this high fill level
//     if (!notificationStatus[deviceId]) {
//       try {
//         // Find the device and populate the associated user
//         const device = await Device.findById(deviceId).populate('user');
//         if (!device) {
//           console.error(`Device not found: ${deviceId}`);
//           return;
//         }
//         if (!device.user || !device.user.email) {
//           console.error(`User data missing or email not found for device: ${deviceId}`);
//           return;
//         }
//         const userEmail = device.user.email;
//         const deviceSerial = device.serialNumber;

//         // Retrieve the latest sensor data for this device
//         const latestSensorData = await SensorData.findOne({ device: deviceId }).sort({ timestamp: -1 });
//         let locationInfo = "";
//         // Only include location if both latitude and longitude are non-zero
//         if (
//           latestSensorData &&
//           latestSensorData.latitude &&
//           latestSensorData.longitude &&
//           (latestSensorData.latitude !== 0 && latestSensorData.longitude !== 0)
//         ) {
//           locationInfo = await getLocation(latestSensorData.latitude, latestSensorData.longitude);
//         }

//         await sendNotificationEmail(userEmail, deviceId, fillLevel, deviceSerial, locationInfo);
//         // Mark notification as sent for this device
//         notificationStatus[deviceId] = true;
//       } catch (error) {
//         console.error(`Error processing notification for device ${deviceId}:`, error);
//       }
//     }
//   } else {
//     // Reset the notification flag if fill level is below 80%
//     notificationStatus[deviceId] = false;
//   }
// };
export const checkAndNotifyBinFill = async (deviceId, fillLevel) => {
  if (fillLevel >= 80) {
    if (!notificationStatus[deviceId]) {
      try {
        // Find the device and populate the associated user
        const device = await Device.findById(deviceId).populate('user');
        if (!device) {
          console.error(`Device not found: ${deviceId}`);
          return;
        }
        if (!device.user || !device.user.email) {
          console.error(`User data missing or email not found for device: ${deviceId}`);
          return;
        }
        const userEmail = device.user.email;
        const deviceSerial = device.serialNumber;

        // Retrieve the latest sensor data for this device
        const latestSensorData = await SensorData.findOne({ device: deviceId }).sort({ timestamp: -1 });
        let locationInfo = "";
        if (
          latestSensorData &&
          typeof latestSensorData.latitude === "number" &&
          typeof latestSensorData.longitude === "number" &&
          latestSensorData.latitude !== 0 &&
          latestSensorData.longitude !== 0
        ) {
          locationInfo = await getLocation(latestSensorData.latitude, latestSensorData.longitude);
          // Fallback: If reverse geocoding fails, include raw coordinates
          if (!locationInfo) {
            locationInfo = `Coordinates: (${latestSensorData.latitude}, ${latestSensorData.longitude})`;
          }
        }

        await sendNotificationEmail(userEmail, deviceId, fillLevel, deviceSerial, locationInfo);
        notificationStatus[deviceId] = true;
      } catch (error) {
        console.error(`Error processing notification for device ${deviceId}:`, error);
      }
    }
  } else {
    notificationStatus[deviceId] = false;
  }
};