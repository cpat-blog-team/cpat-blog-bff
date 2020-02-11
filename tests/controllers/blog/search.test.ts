import * as BlogController from '../../../src/controllers/blog';

describe('This tests if you can search for a user using the BlogController', () => {
	test('Test to see if blog search controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'search');
	});

	test('Test to see if receive valid response from the controller', (done) => {
		let request = require('request');
		let options = {
			method: 'GET',
			url: 'http://localhost:3000/blog/search?userId=5e39bf339ff0183991cb77e7',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json'
			}
		};

		request(options, function (error: any, response: any) {
			if (error) throw new Error(error);
			const respBody = JSON.parse(response.body);

			expect(respBody.blogs.length).toBeLessThan(2);
			expect(respBody.blogs.length).toBeGreaterThan(0);
			done();
		});
	});

	test('Test to see if the search is empty', (done) => {
		let request = require('request');
		let options = {
			method: 'GET',
			url: 'http://localhost:3000/blog/search',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json'
			}
		};

		request(options, function (error: any, response: any) {
			if (error) throw new Error(error);
			const respBody = JSON.parse(response.body);

			expect(respBody.blogs.length).toEqual(0);
			done();
		});
	});
});
