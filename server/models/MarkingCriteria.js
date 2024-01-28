// // MarkingCriteria model

// const mongoose = require('mongoose');

// const markingCriteriaSchema = new mongoose.Schema({
//     assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
//     criteria: [{
//         name: { type: String, required: true },
//         description: { type: String, required: true },
//         assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
//     }],
// });

// module.exports = mongoose.model('MarkingCriteria', markingCriteriaSchema);
