import * as CommunityGuidelinesController from '../../../src/controllers/communityGuidelines';
import request from 'request-promise';
import { makeQuery } from '../../utils';
import { exampleGuidelines } from '../../utils';

describe('CommunityGuidelinesController', () => {
  let seededGuidelines: any;

  beforeAll(async (done) => {
    const seedQuery = makeQuery(
      'POST',
      '/communityGuidelines',
      JSON.stringify(exampleGuidelines)
    );

    // seed db with 3 example guidelines and store the latest of the 3 in var seededGuidelines for testing
    await request(seedQuery);
    await request(seedQuery);
    const { communityGuidelines } = JSON.parse(await request(seedQuery));
    seededGuidelines = communityGuidelines;
    done();
  });

  test('Controller should be exposed for endpoint', () => {
    jest.spyOn(CommunityGuidelinesController, 'getLatest');
  });

  test('Should receive valid response from the controller', async (done) => {
    const options = makeQuery('GET', '/communityGuidelines', null);
    const { communityGuidelines } = JSON.parse(await request(options));
    expect(communityGuidelines).toBeInstanceOf(Object);
    done();
  });

  test('Should return most recently updated guidelines', async (done) => {
    let options = makeQuery('GET', '/communityGuidelines', null);
    const { communityGuidelines } = JSON.parse(await request(options));
    expect(communityGuidelines.version).toEqual(seededGuidelines.version);
    done();
  });
});
