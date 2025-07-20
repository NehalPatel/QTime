const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
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

// GET /api/questions?exam_id=... - List all questions (optionally by exam)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { exam_id } = req.query;
        let questions;
        if (exam_id) {
            questions = await Question.find({ exam_id });
        } else {
            questions = await Question.find();
        }
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/questions - Create new question and link to exam
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { text, options, correct_option, exam_id } = req.body;
        if (!exam_id) return res.status(400).json({ error: 'exam_id is required' });

        // Check if exam exists
        const exam = await Exam.findById(exam_id);
        if (!exam) return res.status(404).json({ error: 'Exam not found' });

        const question = new Question({ text, options, correct_option, exam_id });
        await question.save();


        // Add question to exam's questions array
        await Exam.findByIdAndUpdate(
            exam_id,
            { $push: { questions: question._id } },
            { runValidators: false }
        );
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /api/questions/:id - Get question by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/questions/:id - Update question by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { text, options, correct_option } = req.body;
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { text, options, correct_option },
            { new: true }
        );
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.json(question);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/questions/:id - Delete question by ID and remove from exam
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ error: 'Question not found' });
        // Remove question from exam's questions array
        await Exam.findByIdAndUpdate(question.exam_id, { $pull: { questions: question._id } });
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;