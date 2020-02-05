import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import User from '../../models/User';

const all: RequestHandler = async (req, res) => {
	const users = await User.find();
	res.send({ users });
};

export default handleErrorMiddleware(all);
