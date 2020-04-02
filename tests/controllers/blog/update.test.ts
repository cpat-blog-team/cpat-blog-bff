import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { examplePost, makeQuery } from '../../utils';

describe('Update blog posts through the BlogController', () => {
	test('Test to see if blog update controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'update');
	});

	test('Test to see if receive valid response from the controller will update the version by 1', async (done) => {
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(examplePost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.version).toBe(examplePost.version + 1);
		done();
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(examplePost)
		);
		const respBody = JSON.parse(await request(options));
		expect(typeof respBody.blog).toBe('object');
		Object.keys(examplePost).forEach((property) => {
			expect(respBody.blog).toHaveProperty(property);
		});
		done();
	});

	test('Test to see if receive valid response from the controller will update the content', async (done) => {
		const oldContent = examplePost.content;
		examplePost.content = 'I was changed by a test!';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(examplePost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.content).not.toBe(oldContent);
		done();
	});

	test('Test to see if receive valid response from the controller will update the summary', async (done) => {
		const oldSummary = examplePost.summary;
		examplePost.summary = 'I was changed by a test!';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(examplePost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.summary).not.toBe(oldSummary);
		done();
	});

	test('Test to see if receive valid response from the controller will update the title', async (done) => {
		const oldTitle = examplePost.title;
		examplePost.title = 'I was changed by a test!';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(examplePost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.title).not.toBe(oldTitle);
		done();
	});

	test('Test to see if that the endpoint can not change the email on a blog post', async (done) => {
		const oldUsername = examplePost.email;
		examplePost.email = 'bruce banner';
		const options = makeQuery(
			'POST',
			'/blogs/update',
			JSON.stringify(examplePost)
		);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blog.username).toBe(oldUsername);
		done();
	});
});
