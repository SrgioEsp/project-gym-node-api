const sessionRouter = require('express').Router();
const Session = require('../models/Session');

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
sessionRouter.post('/', (request, response, next) => {
	const body = request.body;
	if (!body) {
		response.status(400).json({
			error: 'data failed',
		});
	}
	const newSession = new Session({
		userId: body.userId,
		name: body.name,
		trainees: body.trainees,
		days: body.days,
	});
	newSession
		.save()
		.then((res) => {
			response.json(res);
		})
		.catch((error) => next(error));
});

/**
 * DELETE session by id
 */
sessionRouter.delete('/:id', (request, response, next) => {
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
sessionRouter.put('/:id', (request, response, next) => {
	const id = request.params.id;
	const session = request.body;

	const newSessionInfo = {
		userId: session.userId,
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
