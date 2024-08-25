const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// POST method endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (data && Array.isArray(data)) {
        // Process data
        const numbers = data.filter(item => /^\d+$/.test(item)); // Extract digits
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item)).map(item => item.toUpperCase()); // Extract alphabets and convert to uppercase
        const lowercaseAlphabets = data.filter(item => /^[a-z]$/.test(item)); // Filter lowercase alphabets
        const highestLowercaseAlphabet = lowercaseAlphabets.length 
            ? [String.fromCharCode(Math.max(...lowercaseAlphabets.map(char => char.charCodeAt(0))))] 
            : [];

        const response = {
            is_success: true,
            user_id: process.env.USER_ID,
            email: process.env.EMAIL,
            roll_number: process.env.ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        return res.status(200).json(response);
    } else {
        return res.status(400).json({ is_success: false, message: 'Invalid data' });
    }
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server (optional if running locally)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
