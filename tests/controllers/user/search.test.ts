import * as UserController from '../../../src/controllers/user';

describe('This tests if you can search for a user using the UserController', () => {
	test('Test to see if user search controller is exposed for endpoint', () => {
		jest.spyOn(UserController, 'search');
	});

	test('Test to see if receive valid response from the controller', (done) => {
		let request = require('request');
		let options = {
			method: 'GET',
			url: 'http://localhost:3000/user/search',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json'
			}
		};

		request(options, function (error: any, response: any) {
			if (error) throw new Error(error);
			const { users } = JSON.parse(response.body);
			expect(users.length).toBeLessThan(2);
			done();
		});
	});
});
