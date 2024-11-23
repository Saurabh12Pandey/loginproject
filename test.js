const tls = require('tls');  // Import TLS module

// Define connection options
const options = {
    host: '13.203.77.74',  // IP of your AD server
    port: 636,              // LDAPS port
    rejectUnauthorized: false,  // Ignore certificate validation (for self-signed certificates)
    secureProtocol: 'TLSv1_2_method'  // Use TLS 1.2 for the connection
};

// Attempt to create a TLS connection to the AD server
const socket = tls.connect(options, () => {
    console.log('Connected to the AD server');  // Successfully connected message
    socket.end();  // Close the connection after testing
});

// Handle error events
socket.on('error', (err) => {
    console.error('Error connecting to AD server:', err.message);  // Log any connection errors
});
