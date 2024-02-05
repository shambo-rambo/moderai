// Comments Model
const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    essayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Essay',
        required: false, 
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
