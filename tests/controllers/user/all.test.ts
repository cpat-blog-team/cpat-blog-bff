import * as UserController from '../../../src/controllers/user';

describe('This tests if you can receive all users using the UserController', () => {
	test('Test to see if user all controller is exposed for endpoint', () => {
		jest.spyOn(UserController, 'all');
	});

	test('Test to see if receive valid response from the controller', (done) => {
		let request = require('request');
		let options = {
			method: 'GET',
			url: 'http://localhost:3000/user/all',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json'
			}
		};

		request(options, function(error: any, response: any) {
			if (error) throw new Error(error);

			const respBody = JSON.parse(response.body);
			expect(respBody.users).toBeInstanceOf(Array);
			done();
		});
	});
});
