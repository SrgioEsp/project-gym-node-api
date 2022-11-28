const mongoose = require('mongoose');

const sessionsSchema = new mongoose.Schema({
	userId: String,
	name: String,
	trainees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Trainee',
		},
	],
	days: {
		weekdays: [
			{
				day: String,
				startTime: String,
				endTime: String,
			},
		],
		extras: [],
		disabled: [],
	},
});

sessionsSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Session = mongoose.model('Session', sessionsSchema);

// const session = new Session({
// 	userId: '636bc83bb1fe5f54575a3f7d',
// 	trainees: ['636c0877eaf67b109aff6441', '636c088aeaf67b109aff6443'],
// 	sessionType: SESSION_TYPES.DUO,
// 	name: 'Sesión 1',
// });

// session
// 	.save()
// 	.then((res) => {
// 		mongoose.connection.close();
// 	})
// 	.catch((error) => console.error(error));

module.exports = Session;
