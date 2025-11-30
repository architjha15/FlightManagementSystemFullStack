// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Make sure you have dotenv installed to load .env variables

// 1. Configure the Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your App Password (not your login password)
  }
});

// 2. Define the Send Function
const sendConfirmationEmail = async (userEmail, ticketDetails) => {
  try {
    const mailOptions = {
      from: `"Booking System" <${process.env.EMAIL_USER}>`, // Sender address
      to: userEmail, // Receiver address
      subject: 'Booking Confirmed - Ticket #' + ticketDetails.ticketId, // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color: #4CAF50;">Booking Confirmed!</h2>
          <p>Hello,</p>
          <p>Thank you for your payment. Your ticket has been successfully booked.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0;">
            <h3>Ticket Details</h3>
            <p><strong>Reference ID:</strong> ${ticketDetails.ticketId}</p>
            <p><strong>Amount Paid:</strong> ₹${ticketDetails.amount}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <p>Please keep this Reference ID safe for future correspondence.</p>
          <p>Best Regards,<br/>Support Team</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendConfirmationEmail };