import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { examplePost, makeQueryWithFile } from '../../utils';



describe('This tests if you can add a blog using the BlogController', () => {
	test('Test to see if blog add controller is exposed for endpoint', () => {
		jest.spyOn(BlogController, 'add');
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const { blog } = JSON.parse(await request(makeQueryWithFile('POST', '/blogs/add', examplePost)));
		expect(typeof blog).toBe('object');
		
		console.log(blog, 'this is blog');

		Object.keys(examplePost).forEach((property) => {
			expect(blog).toHaveProperty(property);
		});
		done();
	});
});
