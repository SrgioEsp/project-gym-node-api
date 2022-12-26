const trainingRouter = require('express').Router();
const userExtractor = require('../middleware/userExtractor');
const Training = require('../models/TrainingSession');
const User = require('../models/User');

/**
 * GET a list of training by userId **REVISAR**
 */
trainingRouter.get('/', userExtractor, (request, response, next) => {
	const id = request.userId;

	Training.find({ id })
		.then((trainingSession) => response.json(trainingSession))
		.catch((error) => next(error));
});

/**
 * GET a trainingSession by id
 */
trainingRouter.get('/:id', (request, response, next) => {
	const id = request.params.id;
	Training.findById(id)
		.then((res) => {
			response.json(res);
		})
		.catch((error) => next(error));
});

/**
 * POST trainingSession data and create a trainingSession
 */
trainingRouter.post('/', userExtractor, async (request, response, next) => {
	const body = request.body;
	const id = request.userId;
	// const id = request.body.user;

	if (!body) {
		response.status(400).json({
			error: 'data failed',
		});
	}

	const user = await User.findById(id);

	const newTrainingSession = new Training({
		user: id,
		name: body.name,
		sessions: body.sessions,
		exercises: body.exercises,
	});

	try {
		const saveTrainingSession = await newTrainingSession.save();

		user.training = user.training.concat(saveTrainingSession._id);
		await user.save();

		response.json(saveTrainingSession);
	} catch (error) {
		next(error);
	}
});

/**
 * DELETE trainingSession by id
 */
trainingRouter.delete('/:id', userExtractor, (request, response, next) => {
	const id = request.params.id;
	Training.findByIdAndDelete(id)
		.then((res) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

/**
 * PUT trainingSession data and update trainingSession
 */
trainingRouter.put('/:id', userExtractor, (request, response, next) => {
	const id = request.params.id;
	const trainingSession = request.body;

	const newTrainingSessionInfo = {
		name: trainingSession.name,
		sessions: trainingSession.sessions,
		exercises: trainingSession.exercises,
	};

	Training.findByIdAndUpdate(id, newTrainingSessionInfo, { new: true })
		.then((res) => {
			response.json(res);
		})
		.catch((error) => next(error));
});

module.exports = trainingRouter;
