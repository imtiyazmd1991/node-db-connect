const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err){
    return console.log('error connecting to database');
  }
  console.log('connected to database succesfully');

  db.close();
})
