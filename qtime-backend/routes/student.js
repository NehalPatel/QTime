const express = require('express');
const router = express.Router();

// POST /api/students/register
router.post('/register', (req, res) => {
    // TODO: Register new student
    res.json({ message: 'Register student (to be implemented)' });
});

// POST /api/students/join
router.post('/join', (req, res) => {
    // TODO: Student joins exam
    res.json({ message: 'Join exam (to be implemented)' });
});

module.exports = router;