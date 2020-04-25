import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { makeQuery } from '../../utils';
import { exampleList, examplePost } from '../../utils/examplePost';
import { ApprovalStatus } from '../../../src/models/Blog';

describe('BlogController', () => {
	beforeEach(async (done) => {
		// wipe DB
		await request(makeQuery('DELETE', '/dev/wipeDB', null));
		done();
	});

	test('Controller should be exposed for endpoint', () => {
		jest.spyOn(BlogController, 'all');
	});

	test('Should receive valid response from the controller', async (done) => {
		const { blogs } = JSON.parse(await request(makeQuery('GET', '/blogs', null)));
		expect(blogs).toBeInstanceOf(Array);
		done();
	});

	test('Should order blogs from newest to latest', async (done) => {
		// seed DB with exampleList
		await request(makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: exampleList(5) })));
		// add new blog to db through add route
		await request(makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: [examplePost] })));
		// query api for all blogs and expect the top blog in the response to be the most recently added blog
		const { blogs } = JSON.parse(await request(makeQuery('GET', '/blogs', null)));
		const respFirstBlog = blogs[0];

		expect(respFirstBlog.title).toEqual(examplePost.title);
		done();
	});

	test('Should not return Pending or Rejected blogs', async (done) => {
		// seed DB with pending, rejected and approved post
		const pendingPost = { ...examplePost };
		pendingPost.approved = ApprovalStatus.Pending;
		const rejectedPost = { ...examplePost };
		rejectedPost.approved = ApprovalStatus.Rejected;
		await request(makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: [pendingPost, rejectedPost, examplePost] })));
		const { blogs } = JSON.parse(await request(makeQuery('GET', '/blogs', null)));

		expect(blogs.length).toBe(1);
		done();
	});
});
