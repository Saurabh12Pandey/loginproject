const express = require('express');
const path = require('path');
const ActiveDirectory = require('activedirectory'); // Import Active Directory library
const port = 4000;
const app = express();

// Middleware to parse form data
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

// Active Directory configuration
const config = {  
    url: 'ldaps://13.203.77.74',  // LDAPS URL of your AD server (secure connection)
    baseDN: 'dc=ac,dc=in',        // The Base DN for your AD directory (adjust as per your AD structure)
    username: 'pandey@ac.in',     // Service account username
    password: 'Gla@1234',          // Service account password
    tlsOptions: {
        rejectUnauthorized: false,  // Temporarily disable certificate validation
    },
    timeout: 60000
    
};

const ad = new ActiveDirectory(config);

// Serve the login form
app.get('/', (req, res) => {

    console.log('GET / route hit');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission and authenticate user
app.post('/ssspost', (req, res) => {
    console.log('Form data received:', req.body); 
    const { username, password } = req.body;

    console.log(`Attempting to authenticate username: ${username}`);
    if (!username || !password) { 
        return res.status(400).send('Username and password are required');
    }

    // console.log(`Attempting to authenticate user: ${username}`);

    // Authenticate against Active Directory using the provided credentials
    ad.authenticate(username, password, function (err, isAuthenticated) {
        if (err) {
            console.error('Error during authentication:', err);
            return res.status(500).send(`Internal Server Error: ${err.message}`);
        }

        if (isAuthenticated) {
            console.log('User authenticated');
            res.send('Authentication successful!');
        } else {
            console.log('Authentication failed');
            res.status(401).send('Authentication failed. Invalid username or password.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started successfully on http://localhost:${port}`);
});
