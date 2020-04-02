import * as BlogController from '../../../src/controllers/blogs';
import { examplePost, makeQuery } from '../../utils';

import request from 'request-promise';

describe('Search for a user using the BlogController', () => {
	let options;

	beforeAll(async (done) => {
		// wipe DB, seed with examplePost
		options = makeQuery('POST', '/dev/seed', JSON.stringify({ blogs: [examplePost] }));
		await request(options);
		done();
	});

	test('Controller should be exposed at endpoint "search"', () => {
		jest.spyOn(BlogController, 'search');
	});

	test('Should return correct blog when searching by title', async (done) => {
		const options = makeQuery('GET', `/blogs/search?title=${examplePost.title}`, null);
		const respBody = JSON.parse(await request(options));
		const { blogs } = respBody;

		expect(Array.isArray(blogs)).toBe(true);
		expect(blogs.includes(null)).toBe(false);
		const [firstPost] = blogs;
		expect(firstPost.title).toBe(examplePost.title);
		done();
	});

	test('Should return correct blog when searching by username', async (done) => {
		const options = makeQuery('GET', `/blogs/search?username=${examplePost.name}`, null);
		const respBody = JSON.parse(await request(options));
		const { blogs } = respBody;

		expect(Array.isArray(blogs)).toBe(true);
		expect(blogs.includes(null)).toBe(false);
		const [firstPost] = blogs;
		expect(firstPost.title).toBe(examplePost.title);
		done();
	});

	test('Should return empty array when search is not passed any parameters', async (done) => {
		const options = makeQuery('GET', '/blogs/search', null);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blogs.length).toEqual(0);
		done();
	});
});
