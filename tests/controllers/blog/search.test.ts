import * as BlogController from '../../../src/controllers/blogs';
import { examplePost, makeQuery } from '../../utils';

import request from 'request-promise';

describe('Search for a user using the BlogController', () => {
	beforeAll(async (done) => {
		// wipe DB
		await request(makeQuery('DELETE', '/dev/wipeDB', null));
		// seed DB with exampleList
		const query = makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: [examplePost] }));
		const res = await request(query);
		done();
	});

	test('Controller should be exposed at endpoint "search"', () => {
		jest.spyOn(BlogController, 'search');
	});

	test('Should return correct blog when searching by title', async (done) => {
		const query = makeQuery('GET', `/blogs/search?title=${examplePost.title}`, null);
		const { blogs } = JSON.parse(await request(query));

		expect(Array.isArray(blogs)).toBe(true);
		expect(blogs.includes(null)).toBe(false);
		const [firstPost] = blogs;
		expect(firstPost.title).toBe(examplePost.title);
		done();
	});

	test('Should return correct blog when searching by username', async (done) => {
		const query = makeQuery('GET', `/blogs/search?username=${examplePost.name}`, null);
		const { blogs } = JSON.parse(await request(query));

		expect(Array.isArray(blogs)).toBe(true);
		expect(blogs.includes(null)).toBe(false);
		const [firstPost] = blogs;
		expect(firstPost.title).toBe(examplePost.title);
		done();
	});

	test('Should return empty array when search is not passed any parameters', async (done) => {
		const query = makeQuery('GET', '/blogs/search', null);
		const { blogs } = JSON.parse(await request(query));
		expect(blogs.length).toEqual(0);
		done();
	});
});
