const mongoose = require('mongoose');

const essaySchema = new mongoose.Schema({
    content: String,
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
});

module.exports = mongoose.model('Essay', essaySchema);