import * as BlogController from '../../../src/controllers/blogs';
import { IBlog } from '../../../src/models/Blog';
import { examplePost } from '../../utils/examplePost';
import { makeQuery } from '../../utils/makeQuery';
import request from 'request';

describe('Search for a user using the BlogController', () => {
	// wipe DB, seed with examplePost and store seeded blog in var "seededBlog"
	beforeAll((done) => {
		const wipeQuery = makeQuery('DELETE', '/dev/wipe', null);
		request(wipeQuery, (error: any, response: any) => {
			if (error) throw new Error(error);
			const addQuery = makeQuery('POST', '/blogs/add', JSON.stringify(examplePost));
			request(addQuery, (error: any, response: any) => {
				if (error) throw new Error(error);
				done();
			});
		});
	});

	test('Controller should be exposed at endpoint "search"', () => {
		jest.spyOn(BlogController, 'search');
	});

	test('Should return correct blog when searching by title', (done) => {
		const options = makeQuery('GET', `/blogs/search?title=${examplePost.title}`, null);
		request(options, function (error: any, response: any) {
			expect(error).toBe(null);

			const respBody = JSON.parse(response.body);
			const { blogs } = respBody;

			expect(Array.isArray(blogs)).toBe(true);
			expect(blogs.includes(null)).toBe(false);
			const firstPost = blogs[0];
			expect(firstPost.title).toBe(examplePost.title);
			done();
		});
	});

	test('Should return empty array when search is not passed any parameters', (done) => {
		const options = makeQuery('GET', '/blogs/search', null);
		request(options, function (error: any, response: any) {
			if (error) throw new Error(error);
			const respBody = JSON.parse(response.body);
			expect(respBody.blogs.length).toEqual(0);
			done();
		});
	});
});
