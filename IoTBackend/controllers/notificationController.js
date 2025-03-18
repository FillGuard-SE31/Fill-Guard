// IoTBackend/controllers/notificationController.js
import nodemailer from 'nodemailer';
import Device from '../models/Device.js'; 
import User from '../models/userModel.js'; 

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
 * Sends an email notification when the bin fill level reaches or exceeds 80%.
 *
 * @param {string} userEmail - The recipient's email address.
 * @param {string} deviceId - The device ID.
 * @param {number} fillLevel - The current fill level percentage.
 */
const sendNotificationEmail = async (userEmail, deviceId, fillLevel) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Bin Fill Level Alert',
      text: `Alert: Your bin (Device ID: ${deviceId}) has reached a fill level of ${fillLevel}%. Please take appropriate action.`,
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
export const checkAndNotifyBinFill = async (deviceId, fillLevel) => {
  if (fillLevel >= 80) {
    // Only send an email if one has not already been sent for this high fill level
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
        await sendNotificationEmail(userEmail, deviceId, fillLevel);
        // Mark notification as sent for this device
        notificationStatus[deviceId] = true;
      } catch (error) {
        console.error(`Error processing notification for device ${deviceId}:`, error);
      }
    }
  } else {
    // Reset the notification flag if fill level is below 80%
    notificationStatus[deviceId] = false;
  }
};