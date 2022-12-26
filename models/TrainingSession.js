const mongoose = require('mongoose');

const trainingSessionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: String,
	sessions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Session',
		},
	],
	exercises: [],
});

trainingSessionSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const TrainingSession = mongoose.model(
	'TrainingSession',
	trainingSessionSchema
);

module.exports = TrainingSession;
