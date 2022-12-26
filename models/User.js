const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	name: { type: String, unique: true },
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
	training: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'TrainingSession',
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

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
