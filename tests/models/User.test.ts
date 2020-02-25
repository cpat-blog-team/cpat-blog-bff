import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import UserModel from '../../src/models/User';
import jwt from 'jsonwebtoken';

describe('test mongoose User model', () => {
	test('should return the doc with findById', () => {
		const current_date = new Date().toISOString();
		const token = jwt.sign({ data: 'foobar' }, 'secret');

		const _doc = {
			_id: '5e39bf339ff0183991cb77e7',
			name: 'test',
			email: 'test@test.com',
			password: 'test',
			session_id: token,
			updated_at: current_date,
			created_at: current_date
		};

		mockingoose(UserModel).toReturn(_doc, 'findOne');

		return UserModel.findById({ _id: '5e39bf339ff0183991cb77e7' }).then(
			(doc) => {
				expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
			}
		);
	});
});
