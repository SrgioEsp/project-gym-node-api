const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const User = mongoose.model('User', userSchema);

// Trainee.find({})
// 	.then((res) => {
// 		console.log(res);
// 		mongoose.connection.close();
// 	})
// 	.catch((err) => console.error(err));

// const user = new User({
// 	name: 'entrenador',
// 	password: 'test',
// });

// user
// 	.save()
// 	.then((res) => {
// 		console.log(res);
// 		mongoose.connection.close();
// 	})
// 	.catch((err) => console.error(err));

module.exports = User;
