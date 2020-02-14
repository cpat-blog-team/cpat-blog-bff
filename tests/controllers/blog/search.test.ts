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
	};

	const exampleBlogPost: Post = {
		userId: '1',
		username: 'bob',
		title: 'bobs blog',
		summary: 'bobs summary',
		content: 'bobs content',
		version: 1
	};

	const makeQuery = (method: string, route: string, body: string) => {
		const query: any = {
			method,
			url: `http://localhost:3000${route}`,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json'
			}
		};
		if (body) query.body = body;
		return query;
	};

	// wipe DB and seed with exampleBlogPost
	beforeAll(async () => {
		const wipeQuery = makeQuery('DELETE', '/dev/wipe', null);
		await request(wipeQuery, (error: any, response: any) => {
			if (error) throw new Error(error);
		});
		const addQuery = makeQuery('POST', '/blog/add', JSON.stringify(exampleBlogPost));
		await request(addQuery, function (error: any, response: any) {
			if (error) throw new Error(error);
		});
	});

	test('Controller should be exposed at endpoint "search"', () => {
		jest.spyOn(BlogController, 'search');
	});

	test('Should return correct blog when searching by title', (done) => {
		const options = makeQuery('GET', `/blog/search?title=${exampleBlogPost.title}`, null);
		request(options, function (error: any, response: any) {
			expect(error).toBe(null);

			const respBody = JSON.parse(response.body);
			const { blogs } = respBody;

			expect(Array.isArray(blogs)).toBe(true);
			expect(blogs.includes(null)).toBe(false);
			const firstPost = blogs[0];
			expect(firstPost.title).toBe(exampleBlogPost.title);
			done();
		});
	});

	test('Should return empty array when search is not passed any parameters', (done) => {
		const options = makeQuery('GET', '/blog/search', null);
		request(options, function (error: any, response: any) {
			if (error) throw new Error(error);
			const respBody = JSON.parse(response.body);

			expect(respBody.blogs.length).toEqual(0);
			done();
		});
	});
});
