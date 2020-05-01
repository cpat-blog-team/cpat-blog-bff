import * as AppIDController from '../../../src/controllers/appid';
import request from 'request-promise';

import { makeQuery } from '../../utils';
import { exitOnError } from 'winston';

describe('This tests if you can update Users roles by their appid id from the appID controller', () => {
	test('Test to see if AppID controller has updateUserRoles property', () => {
		jest.spyOn(AppIDController, 'updateUserRoles');
	});

	test('Should be able to remove all roles by passing the role "none"', async (done) => {
		const role: string = 'none';
		const permissions = JSON.stringify({ role });

		const { roles } = JSON.parse(
			await request(makeQuery('PUT', `/appid/roles/${process.env.TEST_ID}`, permissions))
		);

		expect(roles).toBe(null);
		done();
	});

	test('Should be able to add roles to user by passing array of role names', async (done) => {
		const role: string = 'moderator';
		const permissions = JSON.stringify({ role });

		const { roles } = JSON.parse(
			await request(makeQuery('PUT', `/appid/roles/${process.env.TEST_ID}`, permissions))
		);

		expect(roles.length).toBe(1);
		expect(roles.pop().name).toBe(role);
		done();
	});
});
