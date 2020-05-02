const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
var cors = require('cors');

require('dotenv').config();

const app = express();

// Bodyparser Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`MongoDB connected for ${__filename}...`))
    .catch(err => console.log(err));

// Enable CORS for localhost:3000
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
app.use(cors(corsOptions));


// Use Routes
app.use('/api/twitterscraper', require('./routes/api/twitterscraper'));

// Routes: for client
app.use('/api/region', require('./routes/api/region'));
app.use('/api/markets', require('./routes/api/markets'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

if(process.env.NODE_ENV === 'production') { 
    console.log(process.env.NODE_ENV);
    
    // Cronjobs
    let cron = require('./scripts/cron.js').twitter(HOST,PORT);



    app.use(express.static(path.join(__dirname, 'clients/materialui/build')));  
    app.get('/', (req, res) => {    res.sendfile(path.join(__dirname = 'clients/materialui/build/index.html'));  })
} else {
    // Static files
    console.log("Not in prod.");
    app.use('/', require('./routes/index'));
    app.use(express.static('/public'));
}

    // IG Markets price feed
    require('./custom_modules/node-ig-api-interface');


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

