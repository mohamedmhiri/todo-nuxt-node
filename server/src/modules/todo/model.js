const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Todos', todoSchema, 'todos');