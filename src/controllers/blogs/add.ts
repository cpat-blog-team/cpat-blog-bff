import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const add: RequestHandler = async (req, res) => {
	console.log(req.body, 'body');
	console.log(req.file, 'file');
	
	const { name, email, title, summary, content, version, createdAt, updatedAt } = req.body;
	const date = new Date().toDateString();

	
	const newBlog = { name, email, title, summary, content, version, createdAt, updatedAt, date};

	// @ts-ignore
	if(req.file.filename) newBlog.filename = req.file.filename;

	try {
		const blog = new Blog(newBlog);
		await blog.save();

		res.send({
			message: 'Saved',
			blog: blog.toJSON()
		});
	} catch(err) {
		res.sendStatus(500).send(err);
	}
	
};

export default handleErrorMiddleware(add);
