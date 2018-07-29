var mongoose = require('mongoose');
mongoose.Promises = global.Promises
// var MONGODB_URI_HEROKU = process.env.MONGODB_URI;
// mongoose.connect(MONGODB_URI_HEROKU || 'mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI);


module.exports = {mongoose};