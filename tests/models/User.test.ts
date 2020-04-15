import { schema } from '../../src/models/User';

describe('test mongoose User model', () => {
	test('Users should match the following schema', () => {

		const properties = {
			name: 'test',
			email: 'test@test.com',
			sessionId: 'ertertert5685678657'
		};

		for (let property in properties) {
			expect(schema.obj).toHaveProperty(property);
		}
	});
});
