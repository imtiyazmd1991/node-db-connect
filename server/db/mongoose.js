var mongoose = require('mongoose');
mongoose.Promises = global.Promises
// var MONGODB_URI_HEROKU = process.env.MONGODB_URI;
// mongoose.connect(MONGODB_URI_HEROKU || 'mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err)=>{
    if(!err && err !== null){
        return console.log(`error connecting to mongodb with URL: ${process.env.MONGODB_URI} and error is: ${err}`);
    }
    console.log(`succesfully connected to mongodb with URL: ${process.env.MONGODB_URI}`);
});


module.exports = {mongoose};