const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    total_score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);