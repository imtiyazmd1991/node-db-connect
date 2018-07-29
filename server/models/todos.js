var mongoose = require('mongoose');
var todo = mongoose.model('Todo', {
  _created:{
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
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