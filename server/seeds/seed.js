const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/grading-app');

const seedUsers = [
    {
        username: 'test',
        password: 'test',
        email: 'test@admin.com',
    },
    {
        username: 'fred',
        password: 'fred',
        email: 'fred@users.com',
    },
];

User.insertMany(seedUsers)
    .then(() => {
        console.log('Users successfully seeded.');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
        mongoose.connection.close();
    });