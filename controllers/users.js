const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

/**
 * GET a list of users
 */
usersRouter.get('/', (request, response, next) => {
	User.find({})
		.populate('sessions', {
			user: 0,
		})
		.populate('trainees', {
			user: 0,
		})
		.then((res) => response.json(res))
		.catch((error) => next(error));
});

/**
 * GET user by id
 */
usersRouter.get('/:id', (request, response, next) => {
	const id = request.params.id;
	User.findById(id)
		.populate('sessions', {
			user: 0,
		})
		.populate('trainees', {
			user: 0,
		})
		.then((user) => {
			if (user) {
				response.json({
					id: user.id,
					name: user.name,
					trainees: user.trainees,
					sessions: user.sessions,
				});
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

/**
 * POST data form and get login user
 */
usersRouter.post('/', async (request, response, next) => {
	try {
		const { name, password } = request.body;

		const user = await User.findOne({ name })
			.populate('sessions', { user: 0 })
			.populate('trainees', { user: 0 });
		const passwordCorrect =
			user === null ? false : await bcrypt.compare(password, user.password);

		if (!passwordCorrect) {
			response.status(401).send({
				error: 'invalid user or password',
			});
		}

		response.json({
			id: user.id,
			name: user.name,
			sessions: user.sessions,
			trainees: user.trainees,
		});
	} catch (error) {
		return next(error);
	}
});

module.exports = usersRouter;
