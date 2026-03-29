const Task = require('../models/Task');

// @desc    Get all tasks
exports.getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 }); // Naye tasks upar dikhenge
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a task
exports.createTask = async(req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({
            title,
            description,
            user: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a task
exports.updateTask = async(req, res) => {
    try {
        let updateData = {...req.body };

        // Logic: Agar status complete ho raha hai toh date daalo, varna null karo
        if (req.body.status === 'completed') {
            updateData.completedAt = new Date();
        } else if (req.body.status === 'pending') {
            updateData.completedAt = null;
        }

        const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
exports.deleteTask = async(req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};