const express = require('express');
const router = express.Router();

// GET /api/leaderboard/:exam_id
router.get('/:exam_id', (req, res) => {
    // TODO: Get leaderboard for exam
    res.json({ message: 'Get leaderboard (to be implemented)' });
});

module.exports = router;