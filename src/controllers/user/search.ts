import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import User from '../../models/User';

const buildUserSearchQuery = (email: any) => {
	const query: any = {};

	if (email) {
		query.email = new RegExp(`.*${email}.*`, 'i');
	}

	return query;
};

const get: RequestHandler = async (req, res) => {
	const { email } = req.query;

	const query = buildUserSearchQuery(email);
	const users = [await User.findOne(query)];
	res.send({ users });
};

export default handleErrorMiddleware(get);
