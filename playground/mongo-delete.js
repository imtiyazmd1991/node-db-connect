
const {MongoClient, ObjectId} = require('mongodb');
// // var obj = new ObjectId();
// console.log(obj);

const URL = 'mongodb://localhost:27017/Users';
MongoClient.connect(URL,(err, client)=>{
    if(err){
      return console.log('unable to connect to database', err);
    }
    const db = client.db('Users');
    console.log('succesfully connected to the database');

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
