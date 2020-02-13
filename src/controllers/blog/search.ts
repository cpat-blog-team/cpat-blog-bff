import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog, { IBlog } from '../../models/Blog';

const search: RequestHandler = async (req, res) => {
	const { title } = req.query;

	const query = { title };
	let blogs: IBlog[] = [];

	if (Object.entries(query).length > 0) {
		blogs = await Blog.find(query);
	}

	res.send({ blogs });
};

export default handleErrorMiddleware(search);
