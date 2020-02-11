import * as BlogController from '../../../src/controllers/blog';

describe('This tests if you can add a blog using the BlogController', () => {
	test('Test to see if blog add controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'add');
	});

	test('Test to see if receive valid response from the controller', (done) => {
		let expectedJSON = {
			_id: '12345',
			userId: '12345',
			username: 'BATMAN',
			title: 'Im batman',
			summary: 'the Dark Knight',
			content: 'Wheres Racheal',
			version: 0,
			__v: ''
		};

		let request = require('request');
		let options = {
			method: 'POST',
			url: 'http://localhost:3000/blog/add',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json'
			},
			body: JSON.stringify(expectedJSON)
		};

		request(options, function (error: any, response: any) {
			expect(error).toBe(null);

			const respBody = JSON.parse(response.body);

			expect(typeof respBody.blog).toBe('object');
			expect(Object.keys(respBody.blog)).toEqual(Object.keys(expectedJSON));
			expect(Object.entries(respBody)[0]).toEqual(['message', 'Saved']);
			done();
		});
	});
});
