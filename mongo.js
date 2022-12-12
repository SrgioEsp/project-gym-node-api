const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_URI;

// conexión a mongodb
mongoose
	.connect(
		'mongodb+srv://Sergio:Miperrobubu02@cluster0.cysvhjh.mongodb.net/project-gym?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => console.log(err));

process.on('uncaughtException', (error) => {
	console.log(error);
	mongoose.disconnect();
});
