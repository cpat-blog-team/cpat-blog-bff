import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const all: RequestHandler = async (req, res) => {
	let blogs = await Blog.find();
	blogs = blogs.reverse();
	res.send({ blogs });
};

export default handleErrorMiddleware(all);
