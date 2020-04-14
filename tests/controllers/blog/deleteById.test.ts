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

  test('Blog delete controller should be exposed', () => {
    jest.spyOn(BlogController, 'deleteById');
  });

  test('Should delete correct blog post when passed a valid ID', async (done) => {
    const { _id } = seededPosts[0];
    const deleteQuery = makeQuery('DELETE', `/blogs/${_id}`, null);
    const getByIdQuery = makeQuery('GET', `/blogs/${_id}`, null);

    await request(deleteQuery);

    const { blog } = JSON.parse(await request(getByIdQuery));
    expect(blog).toBe(null);
    done();
  });
});
