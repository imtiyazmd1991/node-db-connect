var {users} =  require('./../server/models/users');
var authenticate = (req, res, next)=>{
  var token = req.header('x-auth');
  users.findByToken(token).then((user)=>{
    // console.log(user);
    if(!user){
      // console.log('no user found');
      res.status(400).send();
    }
    req.user = user;
    req.token = token;
    // res.send(user);
    next();
  }).catch((err)=>{
    res.status(400).send();
  })
};

module.exports = {
  authenticate
};