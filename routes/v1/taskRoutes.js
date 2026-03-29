const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../../controllers/taskController');
const { protect, admin } = require('../../middleware/authMiddleware');

// Saare Task routes protected hain (User must be logged in)
router.route('/')
    .get(protect, getTasks) // GET /api/v1/tasks (Sare tasks dekho)
    .post(protect, createTask); // POST /api/v1/tasks (Naya task banao)

router.route('/:id')
    .put(protect, updateTask) // PUT /api/v1/tasks/:id (Task update karo)
    .delete(protect, deleteTask); // DELETE /api/v1/tasks/:id (Task delete karo)

module.exports = router;