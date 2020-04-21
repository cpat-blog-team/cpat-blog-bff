import * as CommunityGuidelinesController from '../../../src/controllers/communityGuidelines';
import request from 'request-promise';
import { makeQuery, exampleGuidelines } from '../../utils';


describe('This tests if you can add communityGuidelines using the CommunityGuidelinesController', () => {
  beforeAll(async (done) => {
    // wipe DB
    await request(makeQuery('DELETE', '/dev/wipeDB', null));
    done();
  });

  test('Test to see if CommunityGuidelines add controller is exposed for endpoint', () => {
    jest.spyOn(CommunityGuidelinesController, 'add');
  });

  test('Test to see if receive valid response from the controller', async (done) => {
    const options = makeQuery('POST', '/communityGuidelines', JSON.stringify(exampleGuidelines));
    const { communityGuidelines } = JSON.parse(await request(options));
    expect(typeof communityGuidelines).toBe('object');
    Object.keys(exampleGuidelines).forEach((property) => {
      expect(communityGuidelines).toHaveProperty(property);
    });
    done();
  });
});
