const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

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
app.post('/book', (req, res) => {
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

    res.status(201).json({ success: true, message: 'Booking saved successfully!' });
});

// Fetch all bookings
app.get('/bookings', (req, res) => {
    const filePath = './bookings.json';
    let bookings = [];
    if (fs.existsSync(filePath)) {
        bookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    res.json(bookings);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Reviews storage
const reviewsFilePath = './reviews.json';

// Fetch reviews
app.get('/reviews', (req, res) => {
    let reviews = [];
    if (fs.existsSync(reviewsFilePath)) {
        reviews = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
    }
    res.json(reviews);
});

// Add a new review
app.post('/reviews', (req, res) => {
    const { name, text } = req.body;

    if (!name || !text) {
        return res.status(400).json({ message: 'Name and review text are required' });
    }

    const newReview = {
        id: Date.now(),
        name,
        text,
    };

    let reviews = [];
    if (fs.existsSync(reviewsFilePath)) {
        reviews = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
    }
    reviews.push(newReview);
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));

    res.status(201).json({ message: 'Review submitted successfully' });
});

