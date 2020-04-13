import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { makeQuery, exampleList } from '../../utils';

describe('Update blog posts through the BlogController', () => {
  let seededPosts: any;

  beforeAll(async (done) => {
    // wipe DB, seed with examplePost and store seeded blog in var "seededBlog"
    const seedQuery = makeQuery(
      'POST',
      '/dev/seed',
      JSON.stringify({ blogs: exampleList(5) })
    );

    const { blogs } = JSON.parse(await request(seedQuery));
    seededPosts = blogs;
    done();
  });

  test('Blog getById controller should be exposed', () => {
    jest.spyOn(BlogController, 'getById');
  });

  test('Should respond with correct blog when passed valid ID', async (done) => {
    const { _id, title } = seededPosts[0];
    const getByIdQuery = makeQuery('GET', `/blogs/${_id}`, null);

    const { blog } = JSON.parse(await request(getByIdQuery));
    expect(blog.title).toBe(title);
    done();
  });

  test('Should respond with null when passed invalid title', async (done) => {
    const getByIdQuery = makeQuery('GET', '/blogs/<invalid id>', null);

    const { blog } = JSON.parse(await request(getByIdQuery));
    expect(blog).toBe(null);
    done();
  });
});