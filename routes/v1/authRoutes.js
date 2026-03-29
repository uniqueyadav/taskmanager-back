const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../../controllers/authController');
const { protect } = require('../../middleware/authMiddleware');

// Public Routes (Koi bhi access kar sakta hai)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private Route (Sirf logged-in users ke liye - Protect middleware use ho raha hai)
router.get('/profile', protect, getUserProfile);

module.exports = router;