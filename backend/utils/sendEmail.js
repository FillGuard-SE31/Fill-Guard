import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP settings if needed
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (not regular password)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!");
  } catch (error) {
    console.error("❌ Email not sent:", error.message);
    throw new Error("Email could not be sent.");
  }
};

export default sendEmail;
