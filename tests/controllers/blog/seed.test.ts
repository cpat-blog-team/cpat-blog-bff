import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { examplePost, exampleList, makeQuery } from '../../utils';

describe('Seed method at endpoint "/dev/seed"', () => {
  let options;

  beforeEach(async (done) => {
    // seed the db with a document
    options = makeQuery('POST', '/blogs/add', JSON.stringify(examplePost));
    await request(options);
    done();
  });

  test('Controller should have property seed', () => {
    jest.spyOn(BlogController, 'seed');
  });

  test('Should wipe database when not passed any body', async (done) => {
    // deletes all documents in blogs
    options = makeQuery('POST', '/dev/seed', null);
    await request(options);

    // gets all blogs to check that they are empty
    options = makeQuery('GET', '/blogs', null);
    const respBody = JSON.parse(await request(options));
    expect(respBody.blogs).toEqual([]);
    done();
  });

  test('Should seed database with array of blogs when passed in body', async (done) => {
    // deletes all documents in blogs
    const list = exampleList(5);
    options = makeQuery('POST', '/dev/seed', JSON.stringify({ blogs: list }));
    await request(options);

    // gets all blogs to check that they are empty
    options = makeQuery('GET', '/blogs', null);
    const respBody = JSON.parse(await request(options));
    expect(respBody.blogs.length).toBe(list.length);
    done();
  });
});
