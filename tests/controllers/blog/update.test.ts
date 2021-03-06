import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { examplePost, makeQuery } from '../../utils';
import { ApprovalStatus } from '../../../src/models/Blog';

describe('Update blog posts through the BlogController', () => {
	let seededPost: any;

	beforeEach(async (done) => {
		// wipe DB
		await request(makeQuery('DELETE', '/dev/wipeDB', null));
		// seed DB with examplePost
		const query = makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: [examplePost] }));
		const res = await request(query);
		// store seeded blogs in var "seededBlog" for testing
		const { blogs } = JSON.parse(res);
		seededPost = blogs[0];
		done();
	});

	test('Test to see if blog update controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'update');
	});

	test('Test to see if receive valid response from the controller will update the version by 1', async (done) => {
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify(seededPost));
		const { blog } = JSON.parse(await request(query));
		expect(blog.version).toBe(seededPost.version + 1);
		done();
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify(seededPost));
		const { blog } = JSON.parse(await request(query));
		expect(typeof blog).toBe('object');
		Object.keys(seededPost).forEach((property) => {
			expect(blog).toHaveProperty(property);
		});
		done();
	});

	test('Test to see if receive valid response from the controller will update the content', async (done) => {
		const oldContent = seededPost.content;
		seededPost.content = 'I was changed by a test!';
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify(seededPost));

		const { blog } = JSON.parse(await request(query));
		expect(blog.content).not.toBe(oldContent);
		done();
	});

	test('Test to see if receive valid response from the controller will update the summary', async (done) => {
		const oldSummary = seededPost.summary;
		seededPost.summary = 'I was changed by a test!';
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify(seededPost));

		const { blog } = JSON.parse(await request(query));
		expect(blog.summary).not.toBe(oldSummary);
		done();
	});

	test('Test to see if receive valid response from the controller will update the title', async (done) => {
		const oldTitle = seededPost.title;
		seededPost.title = 'I was changed by a test!';
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify(seededPost));

		const { blog } = JSON.parse(await request(query));
		expect(blog.title).not.toBe(oldTitle);
		done();
	});

	test('Test to see if that the endpoint can not change the email on a blog post', async (done) => {
		const oldEmail = seededPost.email;
		seededPost.email = 'bruce banner';
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify(seededPost));

		const { blog } = JSON.parse(await request(query));
		expect(blog.email).toBe(oldEmail);
		done();
	});

	test('Test to see if the blog post status is set to approved', async (done) => {
		seededPost.approved = 1;
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify(seededPost));

		const { blog } = JSON.parse(await request(query));
		expect(blog.approved).toBe(1);
		done();
	});

	test('Should update version when updating title, summary or content', async (done) => {
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify({ title: 'a new title' }));
		const { blog } = JSON.parse(await request(query));
		expect(blog.version).toBe(seededPost.version + 1);
		done();
	});

	test('Should not update version when not updating title, summary or content', async (done) => {
		const query = makeQuery('PATCH', `/blogs/${seededPost._id}`, JSON.stringify({ approved: ApprovalStatus.Approved }));
		const { blog } = JSON.parse(await request(query));
		expect(blog.version).toBe(seededPost.version);
		done();
	});
});
