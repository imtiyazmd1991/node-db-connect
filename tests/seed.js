var {ObjectID} = require('mongodb');
var jwt = require('jsonwebtoken');


var user1 = new ObjectID();
var user2 = new ObjectID();
var user3 = new ObjectID();
var testUsers = [
    {
        _id: new ObjectID(user1),
        email: "mimtiyazmd1991@gmail.com",
        password: "imtiyazmd1991"
    },{
        _id: new ObjectID(user2),
        email: "mimtiyazmd1992@gmail.com",
        password: "imtiyazmd1992",
        tokens:[{
            access: 'auth',
            token: jwt.sign({_id: user2, access:'auth'}, process.env.secretKey)
        }]
    },{
        _id: new ObjectID(user3),
        email: "mimtiyazmd1993@gmail.com",
        password: "imtiyazmd1993"
    }
];


var testTodos = [{
    _created: new ObjectID(user1),
	text: 'This is a test todo for get 1'
}, {
    _created: new ObjectID(user2),
	text: 'This is a test todo for get 2'
}, {
    _created: new ObjectID(user3),
	_id: '5b4c0214c2aa770990d1e9fe',
	text: 'This is a test todo for get 2'
}];

module.exports = {
    testTodos,
    testUsers
};