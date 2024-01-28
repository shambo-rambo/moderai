// // Assignments model
const mongoose = require('mongoose');

const { Schema } = mongoose;

const assignmentSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    instructions: { 
        type: String, 
        required: true,
        trim: true
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;