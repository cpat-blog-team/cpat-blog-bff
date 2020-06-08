import { schema } from '../../src/models/Blog';

describe('test mongoose User model', () => {
	test('Blogs should match the following schema', () => {

		const properties = {
			email: 'luke@skywalker.com',
			name: 'name',
			title: 'star wars VVV',
			summary: 'a story about space wizards',
			content: 'obiwan is alive',
			date: new Date(),
			approved: false
		};

		for (let property in properties) {
			expect(schema.obj).toHaveProperty(property);
		}
	});
});
