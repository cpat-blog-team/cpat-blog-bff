import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const add: RequestHandler = async (req, res) => {
	const { name, email, title, summary, content, version, createdAt, updatedAt } = req.body;

	const blog = new Blog({ name, email, title, summary, content, version, createdAt, updatedAt });
	await blog.save();

	res.send({
		message: 'Saved',
		blog: blog.toJSON()
	});
};

export default handleErrorMiddleware(add);
