const {MongoClient, ObjectId} = require('mongodb');
var URL = 'mongodb://localhost:27017/Users'
MongoClient.connect(URL, (err, client)=>{
  if(err){
    return console.log('error connecting to the database', err)
  }
  console.log('connected to the database succesfully');

  var db = client.db('Users');

  db.collection('Users').updateOne({name:'Imtiyaz'}, {
    $set : {
      name: 'Mohammed'
    },
    $inc: {
      age: 10}
    }
    , {
    upsert: true
  }).then((result)=>{
    console.log('result is: ')
    console.log(result.result);
  }, (err)=>{
    console.log('error updating the document', err);
  });
})
