// var {mongoose} = require('./db/mongoose');
// var {Todo} = require('./models/Todo');
// var {Users} = require('./models/Users');
//
// var express = require('express');
// var bodyParser = require('body-parser');
//
// var app = express();
//
// app.post('todos', (request, response)=>{
//
// })
//
// app.listen(3000,()=>{
//   console.log('app started on port 3000');
// })


var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todos');
var {user} =  require('./models/Users');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((request, response, next)=>{
  // console.log(request.body);
  next();
});

app.get('/todos', (req, res)=>{
  todo.find({}).then((docs)=>{
    res.send({docs})
  }, (err)=>{
    if(err){
      res.status(400).send(err);
    }
  });
});

app.post('/todos', (req, res)=>{
  var Todo = new todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  Todo.save().then((docs)=>{
    res.send(docs);
  }).catch((err)=>{
    if(err){
      res.status(400).send(err);
    }
  });

});

app.listen(3000, ()=>{
  console.log('started app on port 3000');
});

module.exports = {
  app
};