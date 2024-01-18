const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted' });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
