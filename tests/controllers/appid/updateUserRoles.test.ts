import * as AppIDController from '../../../src/controllers/appid';
import request from 'request-promise';

import { makeQuery } from '../../utils';
import { exitOnError } from 'winston';

describe('This tests if you can update Users roles by their appid id from the appID controller', () => {
  test('Test to see if AppID controller has updateUserRoles property', () => {
    jest.spyOn(AppIDController, 'updateUserRoles');
  });

  test('Should be able to remove all roles from user by passing empty array', async (done) => {
    const roleNames: string[] = [];
    const permissions = JSON.stringify({
      roles: {
        names: roleNames
      }
    });

    const { roles } = JSON.parse(await request(makeQuery('PUT', `/appid/roles/${process.env.TEST_ID}`, permissions)));

    expect(roles).toBe(null);
    done();
  });

  test('Should be able to add roles to user by passing array of role names', async (done) => {
    const roleNames: string[] = ['moderator', 'admin'];
    const permissions = JSON.stringify({
      roles: {
        names: roleNames
      }
    });

    const { roles } = JSON.parse(await request(makeQuery('PUT', `/appid/roles/${process.env.TEST_ID}`, permissions)));
    // filter out matching roles from roleNames variable
    const filteredRoles = roles.filter(({ name }: any) => name !== roleNames.shift());

    expect(filteredRoles.length).toBe(0);
    done();
  });
});
