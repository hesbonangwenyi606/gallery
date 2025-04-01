const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Correct MongoDB Atlas URL (use regular connection string format)
let mongodb_url = 'mongodb://hesbonangwenyi123:Test12345!@gallery-shard-00-00.wc344.mongodb.net:27017,darkroom-shard-00-01.wc344.mongodb.net:27017,darkroom-shard-00-02.wc344.mongodb.net:27017/?ssl=true&replicaSet=atlas-xyz-shard-0&authSource=admin&retryWrites=true&w=majority';
let dbName = 'darkroom';

// Connect to MongoDB
mongoose.connect(mongodb_url, { dbName })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });

// Initializing the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

app.use('/', index);
app.use('/image', image);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
