var mongoose = require('mongoose');
var todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    min: 1,
    trim: true
  },completed: {
    type: Boolean,
    enums:[true, false],
    default: false
  },completedAt: {
    type: Number,
    trim: true,
    default: null
  }
});

module.exports = {
  todo
};