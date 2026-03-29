const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
require('dotenv').config();

const app = express();

// --- 🛡️ Middlewares ---
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Allow Cross-Origin requests
app.use(morgan('dev')); // Log requests in console
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// --- 🗄️ Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); // Stop server if DB fails
    });

// --- 🛣️ Routes Import (Placeholder) ---
// Note: Inko separate folders me rakhna professional practice hai
const authRoutes = require('./routes/v1/authRoutes');
const taskRoutes = require('./routes/v1/taskRoutes');

// --- 🚀 API Versioning ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// --- 🏠 Health Check Route ---
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Backend API is running smoothly!",
        version: "1.0.0"
    });
});

// --- ⚠️ Global Error Handler ---
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
});

// --- 🌐 Server Listen ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});