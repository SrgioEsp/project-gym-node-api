const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: String,
	surname: String,
	birthDate: String,
	dni: String,
	gender: String,
	weight: Number,
	height: Number,
	entryDate: Date,
	permanence: {
		activationDate: Date,
		months: Number,
		expiryDate: Date,
	},
});

traineeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Trainee = mongoose.model('Trainee', traineeSchema);

// Trainee.find({})
// 	.then((res) => {
// 		console.log(res);
// 		mongoose.connection.close();
// 	})
// 	.catch((err) => console.error(err));

// const trainee = new Trainee({
// 	name: 'Alumno Prueba 2',
// 	date: '10/11/2022',
// 	edad: '25',
// 	peso: '80',
// 	altura: '190',
// 	userId: 1,
// });

// trainee
// 	.save()
// 	.then((res) => {
// 		console.log(res);
// 		mongoose.connection.close();
// 	})
// 	.catch((err) => console.error(err));

module.exports = Trainee;
