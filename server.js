const express = require('express');

const connectDB = require('./config/db');
const PORT = process.env.PORT || 3300;
const path = require('path');

// Import Routes
const userRoute = require('./routes/api/users');
const todoRoute = require('./routes/api/todos');

const app = express();

// Connect to Database
connectDB();

app.use(express.json());

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

