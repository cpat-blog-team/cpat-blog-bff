import mockingoose from 'mockingoose';
import app from '../../src/app';
import BlogModel from '../../src/models/Blog';

describe('test mongoose User model', () => {
	test('should return the doc with findById', () => {
		const current_date = new Date().toISOString();

		const _doc = {
			_id: '507f191e810c19729de860ea',
			userId: '5e39bf339ff0183991cb77e7',
			username: 'name',
			title: 'star wars VVV',
			summary: 'a story about space wizards',
			content: 'obiwan is alive',
			version: 0,
			updated_at: current_date,
			created_at: current_date
		};

		mockingoose(BlogModel).toReturn(_doc, 'findOne');

		return BlogModel.findById({ _id: '507f191e810c19729de860ea' }).then(
			(doc: any) => {
				expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
			}
		);
	});
});
