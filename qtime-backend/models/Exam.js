const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    total_marks: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);