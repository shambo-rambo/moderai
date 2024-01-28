// // Essay model

// const mongoose = require('mongoose');

// const essaySchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
//     markingCriteria: { type: mongoose.Schema.Types.ObjectId, ref: 'MarkingCriteria', required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// });

// module.exports = mongoose.model('Essay', essaySchema);