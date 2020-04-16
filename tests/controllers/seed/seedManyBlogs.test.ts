import * as SeedController from '../../../src/controllers/seed';
import request from 'request-promise';
import { exampleList, makeQuery } from '../../utils';

describe('seedManyBlogs method at endpoint "/dev/seedManyBlogs"', () => {
  beforeEach(async (done) => {
    // wipe DB
    await request(makeQuery('DELETE', '/dev/wipeDB', null));
    done();
  });

  test('Controller should have property seedManyBlogs', () => {
    jest.spyOn(SeedController, 'seedManyBlogs');
  });

  test('Should seed database with array of blogs when passed in body', async (done) => {
    // seed DB with exampleList
    const list = exampleList(5);
    await request(makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: list })));

    // gets all blogs to check that they are empty
    const { blogs } = JSON.parse(await request(makeQuery('GET', '/blogs', null)));
    expect(blogs.length).toBe(list.length);
    done();
  });
});
