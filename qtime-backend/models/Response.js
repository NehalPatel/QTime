const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selected_option: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
    is_correct: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Response', ResponseSchema);