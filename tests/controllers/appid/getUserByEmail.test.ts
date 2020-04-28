import * as AppIDController from '../../../src/controllers/appid';
import request from 'request-promise';

import { makeQuery } from '../../utils';

describe('This tests if you can get a Users role by their appid id from the appID controller', () => {
	test('Test to see if AppID controller has getAllUsers property', () => {
		jest.spyOn(AppIDController, 'getUserByEmail');
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const users = JSON.parse(await request(makeQuery('GET', `/appid/user/${process.env.TEST_EMAIL}`, null)));
		expect(Array.isArray(users)).toEqual(true);
		expect(users.length).toBeGreaterThan(0);
		done();
	});
});
