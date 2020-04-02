import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { examplePost, makeQuery } from '../../utils';

describe('Update blog posts through the BlogController', () => {
	let seededPost: any;

	beforeAll(async (done) => {
		// wipe DB, seed with examplePost and store seeded blog in var "seededBlog"
		const options = makeQuery(
			'POST',
			'/dev/seed',
			JSON.stringify({ blogs: [examplePost] })
		);
		const respBody = JSON.parse(await request(options));
		seededPost = respBody.blogs.pop();
		done();
	});

	test('Test to see if blog update controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'update');
	});

	test('Test to see if receive valid response from the controller will update the version by 1', async (done) => {
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(seededPost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.version).toBe(seededPost.version + 1);
		done();
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(seededPost)
		);
		const respBody = JSON.parse(await request(options));
		expect(typeof respBody.blog).toBe('object');
		Object.keys(seededPost).forEach((property) => {
			expect(respBody.blog).toHaveProperty(property);
		});
		done();
	});

	test('Test to see if receive valid response from the controller will update the content', async (done) => {
		const oldContent = seededPost.content;
		seededPost.content = 'I was changed by a test!';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(seededPost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.content).not.toBe(oldContent);
		done();
	});

	test('Test to see if receive valid response from the controller will update the summary', async (done) => {
		const oldSummary = seededPost.summary;
		seededPost.summary = 'I was changed by a test!';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(seededPost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.summary).not.toBe(oldSummary);
		done();
	});

	test('Test to see if receive valid response from the controller will update the title', async (done) => {
		const oldTitle = seededPost.title;
		seededPost.title = 'I was changed by a test!';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(seededPost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.title).not.toBe(oldTitle);
		done();
	});

	test('Test to see if that the endpoint can not change the email on a blog post', async (done) => {
		const oldEmail = seededPost.email;
		seededPost.email = 'bruce banner';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(seededPost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.email).toBe(oldEmail);
		done();
	});
});
