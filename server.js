const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const md5 = require('md5');  // Import the md5 library
const port = 4000;
const app = express();

// Middleware to parse form data
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/saurabh');
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});

// Mongoose Schema for User
const userSchema = new mongoose.Schema({
    regd_no: String,
    name: String,
    email: String,
    branch: String,
    password: String,  // Add a password field
});

// Model for User
const Users = mongoose.model("data", userSchema);

// Serve the form (GET route)
app.get('/', (req, res) => {
    console.log('GET / route hit');
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission (POST route)
app.post('/ssspost', async (req, res) => {
    const { regd_no, name, email, branch, password } = req.body;

    // Hash the password using MD5
    const hashedPassword = md5(password);

    // Create a new user instance with hashed password
    const user = new Users({
        regd_no,
        name,
        email,
        branch,
        password: hashedPassword,  // Save the hashed password
    });

    // Save the user to the database
    await user.save();
    console.log(user);
    res.send("Form submission successful!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started successfully on http://localhost:${port}`);
});
