import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { examplePost } from '../../utils/examplePost';
import { makeQuery } from '../../utils/makeQuery';

describe('This tests if you can add a blog using the BlogController', () => {
	test('Test to see if blog add controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'add');
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const options = makeQuery('POST', '/blogs/add', JSON.stringify(examplePost));
		const respBody = JSON.parse(await request(options));
		expect(typeof respBody.blog).toBe('object');
		Object.keys(examplePost).forEach((property) => {
			expect(respBody.blog).toHaveProperty(property);
		});
		done();
	});
});
