import * as BlogController from '../../../src/controllers/blogs';
import { IBlog } from '../../../src/models/Blog';
import { examplePost } from '../../utils/examplePost';
import { makeQuery } from '../../utils/makeQuery';
import request from 'request-promise';

describe('GetById Controller', () => {
  let options;
  let seededBlog: IBlog;

  beforeAll(async (done) => {
    // wipe DB, seed with examplePost and store seeded blog in var "seededBlog"
    options = makeQuery('POST', '/dev/seed', JSON.stringify({ blogs: [examplePost] }));
    const respBody = JSON.parse(await request(options));
    seededBlog = respBody.blogs.pop();
    done();
  });

  test('Controller should have property "getById"', () => {
    jest.spyOn(BlogController, 'getById');
  });

  test('Should return correct blog when getting by id', async (done) => {
    const options = makeQuery('GET', `/blogs/${seededBlog._id}`, null);
    const respBody = JSON.parse(await request(options));
    const { blog } = respBody;
    expect(typeof blog).toBe('object');
    expect(blog._id).toBe(seededBlog._id);
    done();
  });
});