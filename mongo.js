const mongoose = require('mongoose');

// const connectionString = `mongodb+srv://Sergio:${password}@cluster0.cysvhjh.mongodb.net/project-gym?retryWrites=true&w=majority`;
const connectionString = process.env.MONGO_DB_URI;

// conexión a mongodb
mongoose
	.connect(connectionString)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => console.log(err));

// process.on('uncaughtException', () => {
// 	mongoose.connection.disconnect();
// });
