import * as CommunityGuidelinesController from '../../../src/controllers/communityGuidelines';
import request from 'request-promise';
import { makeQuery, exampleGuidelines } from '../../utils';


describe('This tests if you can add communityGuidelines using the CommunityGuidelinesController', () => {
  test('Test to see if CommunityGuidelines add controller is exposed for endpoint', () => {
    jest.spyOn(CommunityGuidelinesController, 'add');
  });

  test('Test to see if receive valid response from the controller', async (done) => {
    const options = makeQuery('POST', '/communityGuidelines', JSON.stringify(exampleGuidelines));
    const respBody = JSON.parse(await request(options));
    expect(typeof respBody.communityGuidelines).toBe('object');
    Object.keys(exampleGuidelines).forEach((property) => {
      expect(respBody.communityGuidelines).toHaveProperty(property);
    });
    done();
  });
});
