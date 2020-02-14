import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const all: RequestHandler = async (req, res) => {
	const blogs = await Blog.find();
	res.send({ blogs });
};

export default handleErrorMiddleware(all);
