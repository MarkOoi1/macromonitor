const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const favicon = require('express-favicon');

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`MongoDB connected for ${__filename}...`))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:false}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Use Routes
app.use('/users', require('./routes/users'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/api/twitterscraper', require('./routes/api/twitterscraper'));

// Routes: for client
app.use('/api/region', require('./routes/api/region'));
app.use('/api/markets', require('./routes/api/markets'));
app.use('/api/events', require('./routes/api/events'));

app.use(favicon(__dirname + '/build/images/favicon.ico'));

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));