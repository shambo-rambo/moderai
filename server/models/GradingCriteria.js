const mongoose = require('mongoose');

const gradingCriteriaSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    criteria: [String],
});

module.exports = mongoose.model('GradingCriteria', gradingCriteriaSchema);
