// // MarkingCriteria model

const mongoose = require('mongoose');

const { Schema } = mongoose;

const markingCriteriaSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    }
});

const MarkingCriteria = mongoose.model('MarkingCriteria', markingCriteriaSchema);

module.exports = MarkingCriteria;