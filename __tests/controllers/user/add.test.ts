/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
/* eslint-disable no-tabs */

import * as UserController from '../../../src/controllers/user';

describe('This tests if you can add a user using the UserController', () => {
  test('Test to see if user add controller is exposed for endpoint', () => {
      jest.spyOn(UserController, 'add');
    });

	test('Test to see if receive valid response from the controller', () => {
    let expectedJSON = {
			name: 'test',
			email: 'test@test.com',
			password: 'test'
    };
    
    let request = require('request');
    let options = {
      'method': 'POST',
      'url': 'http://localhost:3000/user/add',
      'headers': {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify(expectedJSON)
    };

    request(options, function (error : any, response : any) {
      if (error) throw new Error(error);

      const respBody = JSON.parse(response.body);
      expect(respBody.user.name).toEqual(expectedJSON.name);
      expect(respBody.user.email).toEqual(expectedJSON.email);
      expect(respBody.message).toEqual('Saved');

    });
	});
});
