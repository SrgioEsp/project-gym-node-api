const traineesRouter = require('express').Router();
const userExtractor = require('../middleware/userExtractor');
const Trainee = require('../models/Trainee');

/**
 * GET a list of trainees
 */
traineesRouter.get('/', (request, response, next) => {
	Trainee.find({})
		.then((trainees) => response.json(trainees))
		.catch((error) => next(error));
});

/**
 * GET a list of trainees by userId
 */
traineesRouter.get('/:userId', userExtractor, (request, response, next) => {
	const userId = request.params.userId;

	Trainee.find({ userId })
		.then((trainees) => response.json(trainees))
		.catch((error) => next(error));
});

module.exports = traineesRouter;
