const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/User');

/**
 * POST create user
 */
userRouter.post('/', async (request, response, next) => {
	try {
		const user = request.body;

		if (!user || !user.name || !user.password) {
			return response.status(400).json({
				error: 'user.name or user.password is missing',
			});
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(user.password, saltRounds);

		const newUser = new User({
			name: user.name,
			password: passwordHash,
		});
		const savedUser = await newUser.save();
		response.json(savedUser);
	} catch (error) {
		return next(error);
	}
});

module.exports = userRouter;
