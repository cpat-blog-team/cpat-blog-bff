import * as SeedController from '../../../src/controllers/seed';
import request from 'request-promise';
import { exampleList, makeQuery, exampleGuidelines } from '../../utils';

describe('Seed method at endpoint "/dev/wipeDB"', () => {
  beforeAll(async (done) => {
    // seed DB with exampleList
    const list = exampleList(5);
    await request(makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: list })));
    await request(makeQuery('POST', '/communityGuidelines', JSON.stringify(exampleGuidelines)));
    done();
  });

  test('Controller should have property seed', () => {
    jest.spyOn(SeedController, 'wipeDB');
  });

  test('Should wipe database', async (done) => {
    // deletes all documents in all collections
    await request(makeQuery('DELETE', '/dev/wipeDB', null));

    // gets all blogs to check that they are empty
    const { blogs } = JSON.parse(await request(makeQuery('GET', '/blogs', null)));

    const { communityGuidelines } = JSON.parse(await request(makeQuery('GET', '/communityGuidelines', null)));
    expect(blogs).toEqual([]);
    expect(communityGuidelines).toEqual(null);
    done();
  });
});
