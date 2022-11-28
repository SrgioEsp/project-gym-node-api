const traineeRouter = require('express').Router();
const Trainee = require('../models/Trainee');

/**
 * GET a trainee by id
 */
traineeRouter.get('/:id', (request, response, next) => {
	const traineeId = request.params.id;
	Trainee.findById(traineeId)
		.then((trainee) => {
			if (trainee) {
				return response.json(trainee);
			} else {
				response.status(404).end();
			}
		})
		.catch((err) => {
			next(err);
		});
});

/**
 * POST data trainee and create a new trainee
 */
traineeRouter.post('/', (request, response, next) => {
	const trainee = request.body;

	if (!trainee || !trainee.userId) {
		return response.status(400).json({
			error: 'trainee data is missing',
		});
	}

	const newTrainee = new Trainee({
		userId: trainee.userId,
		name: trainee.name,
		surname: trainee.surname,
		birthDate: trainee.birthDate,
		dni: trainee.dni,
		gender: trainee.gender,
		weight: trainee.weight || null,
		height: trainee.height || null,
		entryDate: new Date(),
		activationDate: new Date(),
		expiryDate: null,
	});
	newTrainee
		.save()
		.then((saveTrainee) => response.json(saveTrainee))
		.catch((error) => next(error));
});

/**
 * DELETE a trainee by id
 */
traineeRouter.delete('/:id', (request, response, next) => {
	const id = request.params.id;
	Trainee.findByIdAndDelete(id)
		.then((res) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

/**
 * PUT trainee data and update trainee
 */
traineeRouter.put('/:id', (request, response, next) => {
	const id = request.params.id;
	const trainee = request.body;

	const newTraineeInfo = {
		userId: trainee.userId,
		name: trainee.name,
		surname: trainee.surname,
		birthDate: trainee.birthDate,
		dni: trainee.dni,
		gender: trainee.gender,
		weight: trainee.weight,
		height: trainee.height,
	};

	Trainee.findByIdAndUpdate(id, newTraineeInfo, { new: true })
		.then((res) => {
			response.json(res);
		})
		.catch((error) => next(error));
});

module.exports = traineeRouter;
