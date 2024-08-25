const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (data) {
        // Process data
        const numbers = data.filter(item => /^\d+$/.test(item)); // Extract digits
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item)).map(item => item.toLowerCase()); // Extract alphabets and convert to lowercase
        const highestLowercaseAlphabet = alphabets.length ? [Math.max(...alphabets)] : [];

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

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Export handler for Vercel
module.exports = (req, res) => {
    // Vercel requires a handler function
    app(req, res);
};
