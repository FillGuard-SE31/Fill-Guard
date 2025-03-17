//backend/controllers/contactController.js
import asyncHandler from "../middleware/asyncHandler.js";
import sendEmail from "../utils/sendEmail.js";

const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }

  // Construct email subject and message
  const emailSubject = `New Contact Message: ${subject || "No Subject"}`;
  const emailMessage = `You have received a new contact message from:
  
Name: ${name}
Email: ${email}

Message:
${message}
`;

  // Send email to the fillguard.iot@gmail.com address
  await sendEmail({
    email: process.env.EMAIL_USER, // fillguard.iot@gmail.com from your .env
    subject: emailSubject,
    message: emailMessage,
  });

  res.status(200).json({ message: "Message sent successfully" });
});

export { sendContactMessage };