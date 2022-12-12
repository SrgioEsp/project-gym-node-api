const sessionRouter = require('express').Router();
const userExtractor = require('../middleware/userExtractor');
const Session = require('../models/Session');
const User = require('../models/User');

/**
 * GET a session by id
 */
sessionRouter.get('/:id', (request, response, next) => {
	const id = request.params.id;
	Session.findById(id)
		.then((res) => {
			response.json(res);
		})
		.catch((error) => next(error));
});

/**
 * POST data session and create a session
 */
sessionRouter.post('/', userExtractor, async (request, response, next) => {
	const body = request.body;

	if (!body) {
		response.status(400).json({
			error: 'data failed',
		});
	}

	const user = await User.findById(body.user);

	const newSession = new Session({
		user: user._id,
		name: body.name,
		trainees: body.trainees,
		days: body.days,
	});

	try {
		const saveSession = await newSession.save();

		user.sessions = user.sessions.concat(saveSession._id);
		await user.save();

		response.json(saveSession);
	} catch (error) {
		next(error);
	}
});

/**
 * DELETE session by id
 */
sessionRouter.delete('/:id', userExtractor, (request, response, next) => {
	const id = request.params.id;
	Session.findByIdAndDelete(id)
		.then((res) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

/**
 * PUT session data and update session
 */
sessionRouter.put('/:id', userExtractor, (request, response, next) => {
	const id = request.params.id;
	const session = request.body;

	const newSessionInfo = {
		user: session.user,
		name: session.name,
		trainees: session.trainees,
		days: session.days,
	};

	Session.findByIdAndUpdate(id, newSessionInfo, { new: true })
		.then((res) => {
			response.json(res);
		})
		.catch((error) => next(error));
});

module.exports = sessionRouter;
