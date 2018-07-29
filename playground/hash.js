// var {SHA256} = require('crypto-js');

// var username = 'mimtiyaz493@gmail.com';

// var hash = SHA256(username); 

// console.log(`Hash of ${username} is ${hash}`);

/**********************************/

// var jsonwebtoken = require('jsonwebtoken');

// var data = {
// 	email: 'mimtiyaz493@gmail.com'
// };

// var token = jsonwebtoken.sign(data, 'myownsecret');

// console.log(`token is: ${token}`);

// var isVerified = jsonwebtoken.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjU1NGFmNmU3ODgxNTIzZTMzZDUxZDEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTMyMzE2NDA2fQ.TLc1sRri9N9J6B8kOOmOMNzOYWXz_Uk8II6BNZWePl4', 'abc123');

// console.log(isVerified);

/**********************************/

var bcrypt = require('bcryptjs');
password = 'NewNewOne123';
// bcrypt.genSalt(10, (err, salt)=>{
// 	bcrypt.hash(password, salt, (err, hash)=>{
// 		console.log(hash);
// 	});
// });

var hashPwd = '$2a$10$1Lbe8WWUXgw//7fsmHbqHO4pxebYGcXKgqNZLBjWFyOCskFcABtru';
bcrypt.compare(password, hashPwd, (err, res)=>{
	console.log(res);
});