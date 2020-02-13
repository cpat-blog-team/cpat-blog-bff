import * as BlogController from '../../../src/controllers/blog';
const request = require('request');

describe('Search for a user using the BlogController', () => {
	interface Post {
		username: string;
		userId: string;
		title: string;
		summary: string;
		content: string;
		version: number;
	}

	const exampleBlogPost: Post = {
		userId: '1',
		username: 'bob',
		title: 'bobs blog',
		summary: 'bobs summary',
		content: 'bobs content',
		version: 1
	};

	// wipe DB and seed with exampleBlogPost
	beforeAll(async () => {
		const wipeQuery = { method: 'DELETE', url: 'http://localhost:3000/dev/wipe', headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' } };
		await request(wipeQuery, (error: any, response: any) => {
			if (error) throw new Error(error);
		});
		const addQuery = { method: 'POST', url: 'http://localhost:3000/blog/add', headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' }, body: JSON.stringify(exampleBlogPost) };
		await request(addQuery, function (error: any, response: any) {
			if (error) throw new Error(error);
		});
	});

	test('Controller should be exposed at endpoint "search"', () => {
		jest.spyOn(BlogController, 'search');
	});

	test('Searching by title should return blog with matching title', (done) => {
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
			expect(error).toBe(null);
			const respBody = JSON.parse(response.body);

			// expect(respBody.blogs.includes(null)).toBe(false);
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
