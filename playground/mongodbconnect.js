// const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
//   if(err){
//     return console.log('error connecting to database');
//   }
//   console.log('connected to database succesfully');
//
//   db.close();
// })


// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');
// // var obj = new ObjectId();
// console.log(obj);

const URL = 'mongodb://localhost:27017/Users';
MongoClient.connect(URL,(err, client)=>{
    if(err){
      return console.log('unable to connect to database', err);
    }
    const db = client.db('TodoApp');
    console.log('succesfully connected to the database');

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

  db.collection('Users').find({}).toArray().then((docs)=>{
    console.log(docs)
    client.close();
    }
    ).catch((err) => {
      if(err)
      console.log(err);
    });

  db.collection('Users').find({}).count().then((count)=>{
    console.log(`The count of Todos is: ${count}`)
    client.close();
    }
    ).catch((err) => {
      if(err)
      console.log(err);
    });

  db.collection('Users').find({name:'Mohammed'}).count().then((count)=>{
    console.log(`The count of Todos is: ${count}`)
    client.close();
    }
    ).catch((err) => {
      if(err)
      console.log(err);
    });

  db.collection('Users').find({name:'Mohammed'}).toArray().then((docs)=>{
    console.log(JSON.stringify(docs, undefined, 2));
    client.close();
    }
    ).catch((err) => {
      if(err)
      console.log(err);
    });

  db.collection('Users').find({name:'Mohammed'}).toArray().then((docs)=>{
    console.log(docs);
  }, (err)=>{
    if(err){
      console.log('error finding the documents', err);
    }
    db.close();
  });

  db.collection('Users').deleteOne({name:'Imtiyaz'});

  db.collection('Users').aggregate([{$group:{_id: '$name',total: {$sum: 1}}}]).
  toArray().then((docs)=>{
    docs.forEach((iterator, callback)=>{
      if(iterator.total > 1){
      db.collection('Users').deleteMany({name:iterator._id});
    }
  })}, (err)=>{
    if(err){
      console.log(err);
    }
  });

  db.collection('Users').findOneAndDelete({name:'Rajiv'}).then((docs)=>{
    console.log(docs);
  });

  // client.close();
});
