const User = require('../models/User');

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
exports.getUsers = async(req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Password hide karke fetch karein
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile (Protected)
// @route   GET /api/v1/auth/profile
exports.getUserProfile = async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};