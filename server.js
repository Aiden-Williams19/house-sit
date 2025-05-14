const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio SMS configuration
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  })
);

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve admin page
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

// Handle booking submissions
app.post('/book', async (req, res) => {
  const { name, address, phone, start_date, end_date, instructions } = req.body;

  if (!name || !address || !phone || !start_date || !end_date) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const newBooking = {
    id: Date.now(),
    name,
    address,
    phone,
    start_date,
    end_date,
    instructions: instructions || 'No instructions provided',
  };

  const filePath = './bookings.json';
  let bookings = [];
  if (fs.existsSync(filePath)) {
    bookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  bookings.push(newBooking);
  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));

  // Send notifications
  try {
    await sendEmailNotification(newBooking);
    await sendSMSNotification(newBooking);
  } catch (error) {
    console.error('Error sending notifications:', error);
  }

  res.status(201).json({ success: true, message: 'Booking saved successfully!' });
});

// Email notification function
async function sendEmailNotification(booking) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Your email to receive notifications
    subject: 'New House Sitting Booking',
    text: `New booking received:
      Name: ${booking.name}
      Address: ${booking.address}
      Phone: ${booking.phone}
      Dates: ${booking.start_date} to ${booking.end_date}
      Instructions: ${booking.instructions}`
  };

  await transporter.sendMail(mailOptions);
}

// SMS notification function
async function sendSMSNotification(booking) {
  await twilioClient.messages.create({
    body: `New booking from ${booking.name} for ${booking.start_date} to ${booking.end_date} at ${booking.address}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.ADMIN_PHONE // Your phone number to receive SMS
  });
}

// ... rest of your existing server code ...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});