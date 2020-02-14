import * as BlogController from '../../../src/controllers/blogs';
import request from 'request';

describe('This tests the seed method of blog controller', () => {
  test('Controller should have property seed', () => {
    jest.spyOn(BlogController, 'seed');
  });

  test('Test to see if receive valid response from the controller', (done) => {
    const expectedJSON = {
      _id: '12345',
      userId: '12345',
      username: 'BATMAN',
      title: 'Im batman',
      summary: 'the Dark Knight',
      content: 'Wheres Racheal',
      version: 0,
      __v: ''
    };

    const options = {
      method: 'POST',
      url: 'http://localhost:3000/blogs/add',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json'
      },
      body: JSON.stringify(expectedJSON)
    };

    // seed the db with a document
    request(options, async function (error: any, response: any) {
      expect(error).toBe(null);

      const respBody = JSON.parse(response.body);

      expect(typeof respBody.blog).toBe('object');
      expect(respBody.blog.length).not.toEqual(0);

      const options = {
        method: 'DELETE',
        url: 'http://localhost:3000/dev/seed',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json'
        }
      };

      // deletes all documents in blogs
      request(options, function (error: any, response: any) {
        expect(error).toBe(null);

        const options = {
          method: 'GET',
          url: 'http://localhost:3000/blogs',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
          }
        };

        // gets all blogs to check that they are empty
        request(options, function (error: any, response: any) {
          if (error) throw new Error(error);
          const respBody = JSON.parse(response.body);
          expect(respBody.blogs).toEqual([]);
          done();
        });
      });
    });
  });

});
