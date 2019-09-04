'use strict';

const express = require('express');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('tiny'));

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.get('/ping', (req, res) => {
	res.send('Pong!');
});

app.get('/api/v1/content', (req, res) => {
	res.status(200).json({
		statusCode: 200,
		data: {
			text: 'This content has been fetched.'
		}
	});
});

app.get('/api/v1/list', (req, res) => {
	res.status(200).json({
		statusCode: 200,
		data: [
			{
				id: 1,
				name: 'Thing 1'
			},
			{
				id: 2,
				name: 'Thing 2'
			}
		]
	});
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server listening on ${PORT}`);
});
