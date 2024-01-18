const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    essay: { type: mongoose.Schema.Types.ObjectId, ref: 'Essay' },
    content: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
