import asyncHandler from "../middleware/asyncHandler.js";
import nodemailer from "nodemailer";

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const sendMail = asyncHandler(async (req, res) => {
  let { name, email, subject, message } = req.body;

  name = name?.trim();
  email = email?.trim();
  subject = subject?.trim();
  message = message?.trim();

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (subject.length < 3) {
    return res
      .status(400)
      .json({ message: "Subject must be at least 3 characters long." });
  }
  if (message.length < 10) {
    return res
      .status(400)
      .json({ message: "Message must be at least 10 characters long." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_US_EMAIL,
      pass: process.env.CONTACT_US_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.CONTACT_US_EMAIL,
    subject: `${subject}`,
    replyTo: email,
    text: `Message from: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
});
