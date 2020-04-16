import * as BlogController from '../../../src/controllers/blogs';
import request from 'request-promise';
import { makeQuery, exampleList } from '../../utils';

describe('Update blog posts through the BlogController', () => {
  let seededPosts: any;

  beforeAll(async (done) => {
    // wipe DB
    await request(makeQuery('DELETE', '/dev/wipeDB', null));
    // seed DB with exampleList
    const res = await request(makeQuery('POST', '/dev/seedManyBlogs', JSON.stringify({ blogs: exampleList(5) })));
    // store seeded blogs in var "seededBlog" for testing
    const { blogs } = JSON.parse(res);
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
