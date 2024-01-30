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
    subjectGroup: {
        type: String,
        required: true,
        enum: ['Language acquisition', 'Language and literature', 'Individuals and societies', 'Sciences', 'Mathematics', 'Arts', 'Physical and health education', 'Design']
    },
    markingCriteria: [{
        type: Schema.Types.ObjectId,
        ref: 'MarkingCriteria'
    }]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;