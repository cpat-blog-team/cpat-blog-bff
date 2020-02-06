/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import request from 'supertest';
import Blog from '../../../src/models/Blog';
import * as BlogController from '../../../src/controllers/blog';
import app from '../../../src/app';

describe('This tests if you can receive all blogs using the BlogController', () => {
	test('Test to see if all controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'all');
	});
	test('Test to see if receive valid response from the controller', () => {
		let request = require('request');
		let options = {
			method: 'GET',
			url: 'http://localhost:3000/blog/all',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json'
			}
		};

		request(options, function(error: any, response: any) {
			if (error) throw new Error(error);
			const respBody = JSON.parse(response.body);
			expect(respBody.blogs.length).toBeGreaterThan(0);
		});
	});
});
