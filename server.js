const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3300;
const path = require('path');

// config dot env file
dotenv.config();

// Import Routes
const userRoute = require('./routes/api/users');
const todoRoute = require('./routes/api/todos');

const app = express();

// Connect to Database
connectDB();

app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/users', userRoute);
app.use('/api/todos', todoRoute);

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

