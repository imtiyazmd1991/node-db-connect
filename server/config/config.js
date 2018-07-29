
var env = process.env.NODE_ENV || 'development';
process.env.dbName = "TodoApp"
if (env === 'development' || env === 'test'){
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
    })
}


// if (process.env.NODE_ENV === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (process.env.NODE_ENV === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
// }