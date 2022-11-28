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
usersRouter.post('/', (request, response, next) => {
	const { name, password } = request.body;
	if (!name || !password) {
		return response.status(401).json({
			error: 'Usuario o contraseña incorrectos',
		});
	}

	User.find({ name, password })
		.populate('sessions', { user: 0 })
		.populate('trainees', { user: 0 })
		.then((usu) => {
			const user = {
				id: usu[0].id,
				name: usu[0].name,
				sessions: usu[0].sessions,
				trainees: usu[0].trainees,
			};
			response.json(user);
		})
		.catch((error) => next(error));
});

module.exports = usersRouter;
