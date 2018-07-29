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
// });
require('./config/config.js');
var { mongoose } = require('./db/mongoose');
var { todo } = require('./models/todos');
var { users } = require('./models/users');
var { ObjectID } = require('mongodb');
var _ = require('lodash');
var { authenticate } = require('./../authentication/authenticate')
var bcrypt = require('bcryptjs');


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((request, response, next) => {
  // console.log(request.body);
  next();
});

app.delete('/users/me/logout', authenticate, (req, res)=>{
  // var users = req.user;
  // console.log('req.user is', req.token);
  req.user.deleteByToken(req.token).then((user)=>{
    res.status(200).send(user);
  }).catch((err)=>{
    res.status(400).send();
  })
});

app.post('/users/login', (req, res) => {
  // console.log(req.body);
  var email = req.body.email;
  var pass = req.body.password;
  // console.log(email, password);
  // var dbpassword;
  users.findByPassword(email, pass).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).status(200).send(user);
    })
  }).catch((err) => {
    res.status(400).send();
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.status(200).send(req.user);
});

app.post('/users', (req, res) => {
  var user = new users(_.pick(req.body, ['email', 'password']));
  user.save().then((user) => {
    // res.send(user);
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).status(200).send(user.toJSON());
    }).catch((err) => {
      res.status(400).send(err);
    })
  }).catch((err) => {
    // console.log('error');
    res.status(400).send(err);
  })
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Id is not valid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null,
      body.completed = false
  }

  todo.findOneAndUpdate({_id: id, _created: req.user._id}, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({ body });
  }).catch(() => {
    res.status(400).send();
  });

});

app.delete('/todos/:id', authenticate, (req, res) => {
  var paramId = req.params.id;

  if (!ObjectID.isValid(paramId)) {
    res.status(404).send(
      {
        Error: 'Inavlid Object Id'
      });
    return
  }

  todo.findOneAndDelete({ _id: paramId, _created: req.user._id }).then((docs) => {
    if (!docs) {
      res.status(404).send({
        Error: 'No document found with the Object Id'
      });
      return
    }
    res.send(docs);
  }, (err) => {
    res.status(400).send({});
  });
})

app.get('/todos/:id', authenticate, (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    todo.find({_id: req.params.id, _created: req.user._id}).then((todos) => {
      if (!todos) {
        return res.send(`cannot find document with id: ${req.params.id}`);
      }
      res.send(todos);
    }, (err) => {
      res.send(err);
    })
  } else {
    res.status(400).send({
      error: `${req.params.id} is an invalid id`
    });
  }
});

app.get('/todos', authenticate, (req, res) => {
  todo.find({_created:req.user._id}).then((docs) => {
    res.send({ docs })
  }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});

app.post('/todos', authenticate, (req, res) => {
  var Todo = new todo({
    _created: req.user._id,
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  Todo.save().then((docs) => {
    res.send(docs);
  }).catch((err) => {
    if (err) {
      res.status(400).send(err);
    }
  });

});


app.listen(process.env.PORT, () => {
  console.log('started app on port ', process.env.PORT);
});

module.exports = {
  app
};