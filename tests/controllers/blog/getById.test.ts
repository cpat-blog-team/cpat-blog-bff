import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { makeQuery, exampleList } from '../../utils';

describe('Update blog posts through the BlogController', () => {
  let seededPosts: any;

  beforeAll(async (done) => {
    // wipe DB
    await request(makeQuery('DELETE', '/dev/wipeDB', null));
    // seed DB with exampleList
    const query = makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: exampleList(5) }));
    const res = await request(query);
    // store seeded blogs in var "seededBlog" for testing
    const { blogs } = JSON.parse(res);
    seededPosts = blogs;
    done();
  });

  test('Blog getById controller should be exposed', () => {
    jest.spyOn(BlogController, 'getById');
  });

  test('Should respond with correct blog when passed valid ID', async (done) => {
    const { _id, title } = seededPosts[0];
    const { blog } = JSON.parse(await request(makeQuery('GET', `/blogs/${_id}`, null)));
    expect(blog.title).toBe(title);
    done();
  });

  test('Should respond with null when passed invalid title', async (done) => {
    const { blog } = JSON.parse(await request(makeQuery('GET', '/blogs/<invalid id>', null)));
    expect(blog).toBe(null);
    done();
  });
});