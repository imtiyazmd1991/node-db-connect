const {MongoClient, ObjectId} = require('mongodb');
var URL = 'mongodb://localhost:27017/Users'
MongoClient.connect(URL, (err, client)=>{
  if(err){
    return console.log('error connecting to mongodb', err);
  }
  var db = client.db('Users');
  db.collection('Users').insertOne({name:'Jainandhan', age: 27, city: 'Atlanta'});
  db.collection('Users').insertMany([{name:'Imtiyaz', age: 25, city: 'Irving'},{name:'Jalal', age: 28, city:'Providence'}]);

  db.collection('TodoApp').insertOne({
    text:'submit timesheet in paycor',
    completed: false
  }, (err, result)=>{
    if(err){
      return console.log('unable to insert data into the TodoApp', err);
    }
    console.log('Inserted data into the database', result.ops);
  })

db.collection('Users').insertOne({
    name: 'Imtiyaz',
    age: 27,
    location:'Seattle'
  }, (err, result)=>{
    if(err){
      return console.log('Unable to insert document into Users collection');
    }
    console.log(result.ops);
  })

  client.close();
});
