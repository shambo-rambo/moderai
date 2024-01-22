require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/essay-grader')
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
