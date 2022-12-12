const userExtractor = require('../middleware/userExtractor');
const traineeRouter = require('express').Router();
const Trainee = require('../models/Trainee');
const User = require('../models/User');

/**
 * GET a trainee by id
 */
traineeRouter.get('/:id', userExtractor, (request, response, next) => {
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
traineeRouter.post('/', userExtractor, async (request, response, next) => {
	try {
		const trainee = request.body;

		const user = await User.findById(request.userId);

		const newTrainee = new Trainee({
			user: user._id,
			name: trainee.name,
			surname: trainee.surname,
			birthDate: trainee.birthDate,
			dni: trainee.dni,
			gender: trainee.gender,
			weight: trainee.weight || null,
			height: trainee.height || null,
			entryDate: new Date(),
			permanence: {
				activationDate: trainee.permanenceMonths !== 0 ? new Date() : null,
				months: trainee.permanenceMonths,
				expiryDate:
					trainee.permanenceMonths !== 0
						? new Date().setMonth(
								new Date().getMonth() + trainee.permanenceMonths
						  )
						: null,
			},
		});

		const saveTrainee = await newTrainee.save();

		user.trainees = user.trainees.concat(saveTrainee);
		await user.save();

		response.json(saveTrainee);
	} catch (error) {
		next(error);
	}
});

/**
 * DELETE a trainee by id
 */
traineeRouter.delete('/:id', userExtractor, (request, response, next) => {
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
traineeRouter.put('/:id', userExtractor, (request, response, next) => {
	const id = request.params.id;
	const trainee = request.body;

	const newTraineeInfo = {
		user: trainee.user,
		name: trainee.name,
		surname: trainee.surname,
		birthDate: trainee.birthDate,
		dni: trainee.dni,
		gender: trainee.gender,
		weight: trainee.weight,
		height: trainee.height,
		permanence: {
			activationDate: trainee.permanenceMonths !== 0 ? new Date() : null,
			months: trainee.permanenceMonths,
			expiryDate:
				trainee.permanenceMonths !== 0
					? new Date().setMonth(
							new Date().getMonth() + trainee.permanenceMonths
					  )
					: null,
		},
	};

	Trainee.findByIdAndUpdate(id, newTraineeInfo, { new: true })
		.then((res) => {
			response.json(res);
		})
		.catch((error) => next(error));
});

module.exports = traineeRouter;
