const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // This loads the variables from your .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your React frontend to talk to this backend
app.use(express.json()); // Allows the server to accept and parse JSON

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import and use routes
// This line requires the routes file and passes the (app) object to it
require('./routes/job.routes')(app);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});