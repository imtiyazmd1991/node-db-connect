const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server/server');

const { todo } = require('./../server/models/todos');
const { users } = require('./../server/models/users');
var {testTodos, testUsers} = require('./seed');
var {ObjectID} = require('mongodb');

beforeEach(
	(done) => {
		users.remove({}).then(()=>{
			users.insertMany(testUsers[1]).then((users)=>{
			}).catch((err)=>{
				return done(err);
			});
			users.insertMany(testUsers[2]).then((users)=>{
			}).catch((err)=>{
				return done(err);
			});
		}).catch((err)=>{
			return done(err);
		});

		todo.remove({}).then(() => {
				todo.insertMany(testTodos).then((todos) => {
					// console.log(todos);
					return done();
				}, (err) => {
					return done(err);
				})
			}).catch((err) => {
				return done(err);
			});
		});

describe('create a new user', ()=>{
	it('has to create a new user', (done)=>{
		request(app)
		.post('/users')
		.send(testUsers[0])
		.expect((response)=>{
			expect(response.body.email).toBe('mimtiyazmd1991@gmail.com');
		})
		.end((err, response)=>{
			if(!err){
				return done();
			}else{
				done(err);
			}
		})
	});
});

describe('insert data into todo collection', () => {
	it('has to insert data into todo collection', (done) => {
		var text = 'This is the todo for test';
		var x_auth;
		request(app)
		.post('/todos')
		.set('x-auth', testUsers[1].tokens[0].token)
		.send({text: text})
		.expect(200)
		.expect((response) => {
			expect(response.body.text).toBe(text);
		}, (err) => {
			if (err) { 
			}
		})
		.end(done)
		}) 
});

describe('It has to get the todos', (done) => {
	it('perform a get of the todos', (done) => {
		request(app)
			.get('/todos')
			.set('x-auth', testUsers[2].tokens[0].token)
			.expect(200)
			.expect((response) => {
				expect(response.body.docs.length).toBe(1);
			}, (err) => {
				if (err) {
					return done(err);
				}
			})
			.end(done)
	});
});


describe('get individual todo', () => {
	it('has to return the todo for the specified get request', (done) => {
		request(app)
			.get('/todos/5b4c0214c2aa770990d1e9fe')
			.set('x-auth', testUsers[2].tokens[0].token)
			.expect(200)
			.expect((response) => {
				expect(response.body[0].text).toBe('This is a test todo for get 3');
			})
			.end(done)
	});
});

describe('Delete request', () => {
	it('has to delete the record by using object id', (done) => {
		request(app)
			.delete('/todos/5b4c0214c2aa770990d1e9fe')
			.set('x-auth', testUsers[2].tokens[0].token)
			.expect(200)
			.expect((response) => {
				expect(response.body._id).toBe('5b4c0214c2aa770990d1e9fe');
			})
			.end(done)
	})
});