import * as AppIDController from '../../../src/controllers/appid';
import request from 'request-promise';

import { makeQuery } from '../../utils';

describe('This tests if you can get a Users role by their appid id from the appID controller', () => {
	test('Test to see if AppID controller has getAllUsers property', () => {
		jest.spyOn(AppIDController, 'getRolesByID');
	});

	test('Test to see if receive valid response from the controller', async (done) => {
		const { roles, activeRole } = JSON.parse(
			await request(makeQuery('GET', `/appid/roles/${process.env.TEST_ID}`, null))
		);

		expect(Array.isArray(roles)).toEqual(true);
		roles.forEach((role): any => {
			expect(typeof role).toBe('string');
		});
		expect(typeof activeRole).toBe('string');
		done();
	});
});
