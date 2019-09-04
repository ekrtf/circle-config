const { exec } = require('child_process');
const axios = require('axios');

jest.setTimeout(300000);

const composeUp = () => new Promise((resolve, reject) => {
	exec('docker-compose up --build -d', (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			return reject();
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		resolve();
	});
});

const composeDown = () => new Promise((resolve, reject) => {
	exec('docker-compose down', (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			return reject();
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		resolve();
	});
});

describe('Dummy test', () => {
	beforeEach(async () => {
		await composeUp();
	});

	afterEach(async () => {
		await composeDown();
	});

	it('should say pong', async () => {
		const res = await axios.get('http://localhost:8080/ping');
		expect(res.data).toBe('Pong!');
	});
});
