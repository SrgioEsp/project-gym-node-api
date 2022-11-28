const usersRouter = require('express').Router();
const User = require('../models/User');

/**
 * GET a list of users
 */
usersRouter.get('/', (request, response, next) => {
	User.find({})
		.then((res) => response.json(res))
		.catch((error) => next(error));
});

/**
 * GET user by id
 */
usersRouter.get('/:id', (request, response, next) => {
	const id = request.params.id;
	User.findById(id)
		.then((user) => {
			if (user) {
				response.json(user);
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
		.then((usu) => {
			const user = {
				id: usu[0].id,
				name: usu[0].name,
			};
			response.json(user);
		})
		.catch((error) => next(error));
});

module.exports = usersRouter;