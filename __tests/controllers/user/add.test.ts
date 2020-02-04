import User from '../../../src/models/User';
import * as UserController from '../../../src/controllers/user';

describe('This tests if you can add a user using the UserController', () => {
  const addUser: any = async (req: any) => {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });
    await user.save();

    return {
      message: 'Saved',
      user: user.toJSON()
    };
  };

  test('Test to see if receive valid response from the controller', () => {
    const expectedJson = {
      message: 'Saved',
      user: {
        _id: '5e39c52fab85c94654645a60',
        name: 'test',
        email: 'test@test.com',
        password: 'test'
      }
    };

    const mockUser = addUser(
      { body: { name: 'asdf', email: 'test@test.com', password: 'test' } },
      null,
      null
    );
    
    // try {
    //     mockUser.then((data: any) => expect(data).toBe(expectedJson));
    // } catch(e) {
        
    // } finally {

    // }
    
  });
});
