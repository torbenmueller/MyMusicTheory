const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const surveyRoutes = require('./routes/survey');

mongoose.connect('mongodb+srv://new-user:' + process.env.MONGO_ATLAS_PW + '@cluster0.76fy5.mongodb.net/musicTheoryDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database!');
	})
	.catch(() => {
		console.log('Connection to database failed!');
	});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	next();
});

app.use('/api/survey', surveyRoutes);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
