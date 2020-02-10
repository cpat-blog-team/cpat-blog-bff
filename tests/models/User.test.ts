import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import UserModel from '../../src/models/User';

describe('test mongoose User model', () => {
	test('should return the doc with findById', () => {
		const _doc = {
			_id: '5e39bf339ff0183991cb77e7',
			name: 'test',
			email: 'test@test.com',
			password: 'test'
		};

		mockingoose(UserModel).toReturn(_doc, 'findOne');

		return UserModel.findById({ _id: '5e39bf339ff0183991cb77e7' }).then(
			(doc) => {
				expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
			}
		);
	});
});
