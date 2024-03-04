// app.js

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const routes = require('./routes');
// Initialize Express app
const app = express();
const Restaurant = require('./models/restaurant');

// Middleware for session management
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Middleware for Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Configure Passport for OAuth authentication with Google
passport.use(new GoogleStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Use profile information (e.g., profile.id, profile.displayName) to create or authenticate a user
    // You would typically find or create a user in your database here
    return done(null, profile);
}));

// Serialize user object to store in session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user object from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Define a route for the root URL
app.get('/foodies', (req, res) => {
    res.send('Welcome to Foodies!');
});

// Route for Google OAuth authentication
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route for Google OAuth callback
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to home page or dashboard
        res.redirect('/');
    }
);

// Routes for authentication
app.get('/login', (req, res) => {
    res.send('Login page');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Middleware for ensuring user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Route for creating a reservation (requires authentication)
app.post('/reservations', isLoggedIn, async (req, res) => {
    try {
        const { restaurantId, date, time, partySize } = req.body;
        const reservation = await Reservation.create({
            user: req.user._id,
            restaurant: restaurantId,
            date,
            time,
            partySize
        });
        res.status(201).send('Reservation created successfully');
    } catch (err) {
        res.status(500).send('Error creating reservation');
    }
});

// Route for getting available reservations for a restaurant
app.get('/restaurants/:id/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({ restaurant: req.params.id });
        res.send(reservations);
    } catch (err) {
        res.status(500).send('Error retrieving reservations');
    }
});

app.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).exec();
        res.render('restaurantDetails', { restaurant });
    } catch (err) {
        res.status(500).send('Error fetching restaurant details');
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});