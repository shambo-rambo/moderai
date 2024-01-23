const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    async signup(req, res) {
        try {
            // Extract user details from request body
            const { password, email } = req.body;

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and save user
            const user = new User({ email, password: hashedPassword });
            await user.save();

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ error: 'Invalid credentials' });

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = authController;
