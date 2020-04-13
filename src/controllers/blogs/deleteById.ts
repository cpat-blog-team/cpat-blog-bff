import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const deletebyId: RequestHandler = async (req, res) => {
	const { id } = req.params;
	await Blog.findByIdAndDelete(id);
	res.sendStatus(202);
};

export default handleErrorMiddleware(deletebyId);
