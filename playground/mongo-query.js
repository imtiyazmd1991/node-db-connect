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

    db.collection('Users').insertMany([{name:'Imtiyaz', age: 25, city: 'Irving'},{name:'Mohammed', age: 28, city:'Providence'}]);

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

      db.collection('Users').find({name:'Imtiyaz'}).count().then((count)=>{
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
});
