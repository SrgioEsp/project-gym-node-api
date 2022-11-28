const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
	sessions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Session',
		},
	],
	trainees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trainee',
		},
	],
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
