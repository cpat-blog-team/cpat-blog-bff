/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import request from 'supertest';
import Blog from '../../../src/models/Blog';
import * as BlogController from '../../../src/controllers/blog';
import app from '../../../src/app';
import { TIMEOUT } from 'dns';

describe('This tests if you can add a blog using the BlogController', () => {
	test('canary', () => {
		expect(false).toBe(false);
	});

	test('Test to see if receive valid response from the controller', () => {
		let expectedJSON = {
			_id: '5e3c38c7090c2b69a1e5b57e',
			userId: '5e39bf339ff0183991cb77e7',
			name: 'test',
			title: 'the best vegetable',
			content: 'potato po tah to',
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

		request(options, function(error: any, response: any) {
			if (error) throw new Error(error);

			const respBody = JSON.parse(response.body);

			expect(Object.keys(respBody.blog)).toEqual(Object.keys(expectedJSON));
			expect(Object.entries(respBody)[0]).toEqual(['message', 'Saved']);
		});
	});
});
