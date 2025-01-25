Project Overview
The House Sitting Website allows users to book house-sitting services and view reviews from previous clients. It includes the following main features:

Main Page: Information about the house-sitting service and booking form.
Booking System: A modal form where users can submit their booking details.
Admin Page: Displays all the bookings in a neat table format.
Review Page: Users can view reviews and leave feedback about the service.

How to Open and Run the Project
Clone the Repository
Download or clone the project folder to your local machine.

Install Node.js
Ensure you have Node.js installed on your computer. If not, download and install it from Node.js Official Website.

Install Dependencies
Open the terminal in the project directory and run the following command to install required packages:

npm install
Start the Server
Run the following command to start the server:

node server.js
By default, the server runs on http://localhost:3000.

Open the Website

Open your browser and navigate to http://127.0.0.1:5500/main.html (if using a live server like VSCode) or http://localhost:3000 (if running directly).
For admin functionalities, navigate to http://localhost:3000/admin.
Pages and Features
Main Page (main.html)

Displays information about the house-sitting service.
Includes a "Book Now" button that opens a modal form to book the service.
Contains a "View Reviews" button that links to the review page.
Admin Page (admin.html)

Shows all bookings in a table format.
Data is fetched dynamically from the server.
Review Page (review.html)

Displays feedback from previous clients.
Allows users to submit their reviews.
Booking Modal

Users can submit their name, address, phone, booking dates, and special instructions.
Submissions are saved to the server and displayed on the admin page.
