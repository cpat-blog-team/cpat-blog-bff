import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const all: RequestHandler = async (req, res) => {
	const blogs = await (await Blog.find()).reverse();
	res.send({ blogs });
};

export default handleErrorMiddleware(all);
