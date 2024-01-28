// // Assignments model
// const mongoose = require('mongoose');

// const assignmentSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     essays: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Essay' }],
//   });

// module.exports = mongoose.model('Assignment', assignmentSchema);