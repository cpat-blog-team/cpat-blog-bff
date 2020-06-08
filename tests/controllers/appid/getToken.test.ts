import * as AppIDController from '../../../src/controllers/appid';

describe('This tests if you can add a blog using the BlogController', () => {
	test('Test to see if AppID add controller is exposed for endpoint', () => {
		jest.spyOn(AppIDController, 'getToken');
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const token = await AppIDController.getToken();
		expect(typeof token).toBe('string');
		done();
	});
});
