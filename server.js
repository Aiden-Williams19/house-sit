const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve the HTML, CSS, and JS

// Endpoint to handle bookings
app.post('/book', (req, res) => {
    const { name, address, phone, start_date, end_date, instructions } = req.body;

    const newBooking = {
        id: Date.now(),
        name,
        address,
        phone,
        start_date,
        end_date,
        instructions,
    };

    // Read existing bookings
    const filePath = './bookings.json';
    let bookings = [];
    if (fs.existsSync(filePath)) {
        bookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    // Add new booking and save
    bookings.push(newBooking);
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));

    res.json({ success: true, message: 'Booking saved successfully!' });
});

// Endpoint to view bookings
app.get('/bookings', (req, res) => {
    const filePath = './bookings.json';
    if (fs.existsSync(filePath)) {
        const bookings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(bookings);
    } else {
        res.json([]);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
