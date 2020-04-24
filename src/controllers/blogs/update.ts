import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const update: RequestHandler = async (req, res) => {
	const _id = req.params.id;
	console.log(req.body);

	// iterate the version if it is going to be updated
	req.body.version += 1;

	// delete the fields that should never be updated
	delete req.body.email;

	// find and update the blog in a single query
	// ensure that the query returns the new obj
	const blog = await Blog.findOneAndUpdate(
		{ _id: _id },
		{ $set: req.body },
		{ new: true },
		(err: Error, doc: any) => {
			if (err) {
				console.log('Something wrong when updating data!');
			}
			console.log(doc);
		}
	);

	res.send({
		message: 'Saved',
		blog: blog.toJSON()
	});
};

export default handleErrorMiddleware(update);
