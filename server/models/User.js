const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstname : { type: String, required: true },
    lastname : { type: String, required: true },
    password: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
});

// Hash password before saving
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);

        this.password = passwordHash;
        next();
    });
});

// Compare password
userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);

        else {
            if (!isMatch) return cb(null, isMatch);

            return cb(null, this);
        }
    });
};


module.exports = mongoose.model('User', userSchema);
