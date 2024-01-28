const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is not defined in your environment variables");
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;