const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    student_id: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);