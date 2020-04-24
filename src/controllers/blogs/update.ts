import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const update: RequestHandler = async (req, res) => {
	const _id = req.params.id;
	const { body } = req;
	console.log(body);

	// delete the fields that should never be updated
	delete body.version; // version should be updated based off of the MongoDB document not the http request
	delete body.email;
	delete body.name;

	// if request is updating title, summary or content increment version
	const { title, summary, content } = body;
	if (title || summary || content) {
		const { version } = await Blog.findById(_id);
		body.version = version + 1;
	}

	// find and update the blog in a single query
	// ensure that the query returns the new obj
	const blog = await Blog.findOneAndUpdate(
		{ _id },
		{ $set: body },
		{ new: true },
		(err: Error, doc: any) => {
			if (err) {
				console.log('Something wrong when updating data! err: ', err);
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
