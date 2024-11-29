// controllers/taskController.js
const Task = require('../models/taskModel');

// Get User Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({ title, description, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const task = await Task.findById(id);
    if (task.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
  
      // Use deleteOne to remove the task
      await task.deleteOne();
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  