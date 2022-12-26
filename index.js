require('dotenv').config();
require('./mongo.js');

const express = require('express');
const app = express();

const cors = require('cors');

const notFound = require('./middleware/notFound.js');
const handleErrors = require('./middleware/handleErrors.js');

const sessionRouter = require('./controllers/session');
const sessionsRouter = require('./controllers/sessions');
const traineesRouter = require('./controllers/trainees');
const traineeRouter = require('./controllers/trainee');
const usersRouter = require('./controllers/users');
const userRouter = require('./controllers/user');
const trainingRouter = require('./controllers/training');

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * Endpoints
 */

app.get('/', (request, response) => {
	response.send('<h1>API PROJECT GYM</h1>');
});

// ---   ---   ---   ---   TRAINEES   ---   ---   ---   ---
app.use('/api/trainees', traineesRouter);
// ----------------------------------------------------------------

// ---   ---   ---   ---   TRAINEE   ---   ---   ---   ---
app.use('/api/trainee', traineeRouter);
// ----------------------------------------------------------------

// ---   ---   ---   ---   USERS   ---   ---   ---   ---
app.use('/api/users', usersRouter);
// ----------------------------------------------------------------

// ---   ---   ---   ---   USER   ---   ---   ---   ---
app.use('/api/user', userRouter);
// ----------------------------------------------------------------

// ---   ---   ---   ---   SESSIONS   ---   ---   ---   ---
app.use('/api/sessions', sessionsRouter);
// ----------------------------------------------------------------

// ---   ---   ---   ---   SESSION   ---   ---   ---   ---
app.use('/api/session', sessionRouter);
// ----------------------------------------------------------------

// ---   ---   ---   ---   TRAINING   ---   ---   ---   ---
app.use('/api/training', trainingRouter);
// ----------------------------------------------------------------

// Middleware
app.use(notFound);
// Middleware
app.use(handleErrors);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
