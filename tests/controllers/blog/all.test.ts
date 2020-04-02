import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { makeQuery } from '../../utils';
import { exampleList, examplePost } from '../../utils/examplePost';

describe('BlogController', () => {
	test('Controller should be exposed for endpoint', () => {
		jest.spyOn(BlogController, 'all');
	});

	test('Should receive valid response from the controller', async (done) => {
		const options = makeQuery('GET', '/blogs', null);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blogs).toBeInstanceOf(Array);
		done();
	});

	test('Should order blogs from newest to latest', async (done) => {
		let options;

		// wipe DB, seed with exampleList
		const blogs = exampleList(5);
		options = makeQuery('POST', '/dev/seed', JSON.stringify({ blogs }));
		await request(options);

		// add new blog to db through add route
		options = makeQuery('POST', '/blogs/add', JSON.stringify(examplePost));
		await request(options);

		// query api for all blogs and expect the top blog in the response to be the most recently added blog
		options = makeQuery('GET', '/blogs', null);
		const respBody = JSON.parse(await request(options));
		const respFirstBlog = respBody.blogs[0];
		expect(respFirstBlog.title).toEqual(examplePost.title);
		done();
	});
});
