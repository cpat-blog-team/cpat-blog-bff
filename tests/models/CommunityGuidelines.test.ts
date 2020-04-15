import { schema } from '../../src/models/CommunityGuidelines';

describe('test mongoose User model', () => {
  test('Community Guidelines should match the following schema', () => {

    const properties = {
      email: 'luke@skywalker.com',
      name: 'name',
      content: 'obiwan is alive',
      version: 0
    };

    for (let property in properties) {
      expect(schema.obj).toHaveProperty(property);
    }
  });
});
