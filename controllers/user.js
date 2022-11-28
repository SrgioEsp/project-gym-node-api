const userRouter = require('express').Router();
const User = require('../models/User');

/**
 * POST create user
 */
userRouter.post('/', (request, response, next) => {
	const user = request.body;

	if (!user || !user.name || !user.password) {
		return response.status(400).json({
			error: 'user.name or user.password is missing',
		});
	}

	const newUser = new User({
		name: user.name,
		password: user.password,
	});
	newUser
		.save()
		.then((saveUser) => response.json(saveUser))
		.catch((error) => next(error));
});

module.exports = userRouter;
