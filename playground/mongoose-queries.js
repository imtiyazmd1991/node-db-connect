const {mongoose} = require('./../server/db/mongoose');

const {ObjectID} = require('mongodb');

 const {todo} = require('./../server/models/todos');

 var Id = '4c0214c2aa770990d1e9fe';

 // console.log(ObjectID.isValid(Id));

 if(ObjectID.isValid(Id)){
	 todo.find({
	 	_id: Id
	 }).then((todos)=>{
	 	console.log('todos are: ', todos);
	 }).catch((err)=>{
	 	console.log('err is: ', err);
	 });

	 todo.findOne({
	 	_id: Id
	 }).then((todo)=>{
	 	console.log(`todo is: ${todo}`);
	 }, (err)=>{
	 	console.log(`error finding the document ${err}`);
	 });

	todo.findById(Id).then((todos)=>{
		if(!todos){
			console.log('no todos found with Id: ', Id);
			return;
		}
		console.log(`todos are: ${todos}`);
	}, (err)=>{
		if(err){
			console.log(`error findidng todos ${err}`);
		}
	});  
}else{
	console.log('Id is not valid');
};