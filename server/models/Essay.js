// Essay Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const essaySchema = new Schema({
    assignmentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Assignment'
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
});

const Essay = mongoose.model('Essay', essaySchema);

module.exports = Essay;
