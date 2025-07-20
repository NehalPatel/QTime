const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register
router.post('/register', async (req, res) => {
    console.log("called");
    try {
        const { student_name, email, phone_number, password } = req.body;
        if (!student_name || !email || !phone_number || !password)
            return res.status(400).json({ error: 'All fields are required' });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const user = new User({ student_name, email, phone_number, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Create JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;