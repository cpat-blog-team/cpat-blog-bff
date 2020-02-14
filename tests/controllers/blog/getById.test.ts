import * as BlogController from '../../../src/controllers/blogs';
import { IBlog } from '../../../src/models/Blog';
import { examplePost } from '../../utils/examplePost';
import { makeQuery } from '../../utils/makeQuery';
import request from 'request';

describe('GetById Controller', () => {
  let seededBlog: IBlog;

  // wipe DB, seed with examplePost and store seeded blog in var "seededBlog"
  beforeAll((done) => {
    const wipeQuery = makeQuery('DELETE', '/dev/wipe', null);
    request(wipeQuery, (error: any, response: any) => {
      if (error) throw new Error(error);
      const addQuery = makeQuery('POST', '/blogs/add', JSON.stringify(examplePost));
      request(addQuery, (error: any, response: any) => {
        if (error) throw new Error(error);
        seededBlog = JSON.parse(response.body).blog;
        done();
      });
    });
  });

  test('Controller should have property "getById"', () => {
    jest.spyOn(BlogController, 'getById');
  });

  test('Should return correct blog when getting by id', (done) => {
    const options = makeQuery('GET', `/blogs/${seededBlog._id}`, null);
    request(options, function (error: any, response: any) {
      expect(error).toBe(null);

      const respBody = JSON.parse(response.body);
      const { blog } = respBody;

      expect(typeof blog).toBe('object');
      expect(blog._id).toBe(seededBlog._id);
      done();
    });
  });
});