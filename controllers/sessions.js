const sessionsRouter = require('express').Router();
const Session = require('../models/Session');

const setSessionType = (session) => {
	switch (session.trainees.length) {
		case 0:
			break;
		case 1:
			session.sessionType = 'INDIVIDUAL';
			break;
		case 2:
			session.sessionType = 'DUO';
			break;
		case 3:
			session.sessionType = 'TRIO';
			break;
		case 4:
			session.sessionType = 'CUARTETO';
			break;
		case 5:
			session.sessionType = 'QUINTETO';
			break;
		default:
			session.sessionType = 'GRUPO';
			break;
	}
	return session;
};

/**
 * GET a list of all sessions
 */
sessionsRouter.get('/', (request, response, next) => {
	Session.find({})
		.then((res) => {
			console.log(res);
			response.json(res);
		})
		.catch((error) => next(error));
});

/**
 * GET a list of sessions filter by userId
 */
sessionsRouter.get('/:userId', (request, response, next) => {
	const userId = request.params.userId;
	Session.find({ userId })
		.then((res) => {
			// res = res.map((session) => setSessionType(session));
			response.json(res);
		})
		.catch((error) => next(error));
});

module.exports = sessionsRouter;
