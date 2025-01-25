# README: House Sitting Website

---

## **Project Overview**
The House Sitting Website allows users to book house-sitting services and view reviews from previous clients. It includes the following main features:

- **Main Page**: Information about the house-sitting service and booking form.
- **Booking System**: A modal form where users can submit their booking details.
- **Admin Page**: Displays all the bookings in a neat table format.
- **Review Page**: Users can view reviews and leave feedback about the service.

---

## **How to Open and Run the Project**

### 1. Clone the Repository
Download or clone the project folder to your local machine.

### 2. Install Node.js
Ensure you have Node.js installed on your computer. If not, download and install it from [Node.js Official Website](https://nodejs.org/).

### 3. Install Dependencies
Open the terminal in the project directory and run the following command to install required packages:
```bash
npm install
```

### 4. Start the Server
Run the following command to start the server:
```bash
node server.js
```
By default, the server runs on `http://localhost:3000`.

### 5. Open the Website
- Open your browser and navigate to `http://127.0.0.1:5500/main.html` (if using a live server like VSCode) or `http://localhost:3000` (if running directly).
- For admin functionalities, navigate to `http://localhost:3000/admin`.

---

## **Pages and Features**

### 1. Main Page (`main.html`)
- Displays information about the house-sitting service.
- Includes a "Book Now" button that opens a modal form to book the service.
- Contains a "View Reviews" button that links to the review page.

### 2. Admin Page (`admin.html`)
- Shows all bookings in a table format.
- Data is fetched dynamically from the server.

### 3. Review Page (`review.html`)
- Displays feedback from previous clients.
- Allows users to submit their reviews.

### 4. Booking Modal
- Users can submit their name, address, phone, booking dates, and special instructions.
- Submissions are saved to the server and displayed on the admin page.

---

## **How the Server Works**
- The server uses `Node.js` and `Express.js` to handle API requests.
- Bookings and reviews are stored in JSON files on the server.
- CORS is enabled to allow communication between the client and server.

---

## **Additional Notes**

- **Dependencies**:  
  Ensure all required packages (`express`, `body-parser`, `cors`, `fs`) are installed using `npm install`.

- **Port Configuration**:  
  The server runs on port 3000 by default. Modify `server.js` if a different port is required.

- **Error Handling**:  
  If you encounter issues, check the terminal logs for detailed error messages.

---

Enjoy using the House Sitting Website! 🎉

