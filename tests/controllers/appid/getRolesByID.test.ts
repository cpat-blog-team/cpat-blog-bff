import * as AppIDController from '../../../src/controllers/appid';

describe('This tests if you can get a Users role by their appid id from the appID controller', () => {
  test('Test to see if AppID controller has getAllUsers property', () => {
    jest.spyOn(AppIDController, 'getRolesByID');
  });
});
