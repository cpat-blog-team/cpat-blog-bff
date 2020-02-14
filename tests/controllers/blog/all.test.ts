import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { makeQuery } from '../../utils';

describe('This tests if you can receive all blogs using the BlogController', () => {
	test('Test to see if all controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'all');
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const options = makeQuery('GET', '/blogs', null);
		const respBody = JSON.parse(await request(options));
		expect(respBody.blogs).toBeInstanceOf(Array);
		done();
	});
});
