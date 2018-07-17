const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server/server');

const {todo} = require('./../server/models/todos');

var testTodos = [{
	text: 'This is a test todo for get 1'
},{
	text: 'This is a test todo for get 2'
},{
	_id: '5b4c0214c2aa770990d1e9fe',
	text: 'This is a test todo for get 2'
}];

beforeEach(
	(done)=>{
		todo.remove({})
	.then(()=>{
		todo.insertMany(testTodos).then(()=>{
			done();
		},(err)=>{
			done(err);
		})
	}, (err)=>{
		done(err);
	});
});

describe('insert data into todo collection', ()=>{
	it('has to insert data into todo collection', (done)=>{
		var text = 'This is the todo for test';

		request(app)
		.post('/todos')
		.send({text}) 
		.expect(200)
		.expect((response)=>{
			expect(response.body.text).toBe(text)
			// done();
		}, (err)=>{
			if(err){
			return done(err);
		}
		})
		.end((err, response)=>{
			if(err){
				return done(err);
			}
			todo.find({text}).then((docs)=>{
				expect(docs.length).toBe(1)
				done();
			}).catch((err)=>{
				return done(err); 
			})
		})
	}); 
});

describe('It has to get the todos', (done)=>{
	it('perform a get of the todos', (done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((response)=>{
			expect(response.body.docs.length).toBe(3);
			// console.log(response.body.docs.length);
			// done();
		},(err)=>{
			if(err){
			return done(err);
		}
		})
		.end(done)
	});
});


describe('get individual todo', ()=>{
	it('has to return the todo for the specified get request', (done)=>{
		request(app)
		.get('/todos/5b4c0214c2aa770990d1e9fe')
		.expect(200)
		.expect((response)=>{
			// console.log(response.body)
			expect(response.body.text).toBe('This is a test todo for get 2');
		})
		.end(done)
	});
});