const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT auth middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// GET /api/exams - List all exams
router.get('/', authenticateToken, async (req, res) => {
    try {
        const exams = await Exam.find();
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/exams - Create new exam
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, total_marks } = req.body;
        const exam = new Exam({ name, total_marks });
        await exam.save();
        res.status(201).json(exam);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /api/exams/:id - Get exam by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) return res.status(404).json({ error: 'Exam not found' });
        res.json(exam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/exams/:id - Update exam by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { name, active, total_marks } = req.body;
        console.log(req.body);
        const exam = await Exam.findByIdAndUpdate(
            req.params.id,
            { name, active, total_marks },
            { new: true }
        );
        if (!exam) return res.status(404).json({ error: 'Exam not found' });
        res.json(exam);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/exams/:id - Delete exam by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (!exam) return res.status(404).json({ error: 'Exam not found' });
        res.json({ message: 'Exam deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;