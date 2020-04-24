import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog, { ApprovalStatus } from '../../models/Blog';

const all: RequestHandler = async (req, res) => {
	let blogs = await Blog.find({ approved: ApprovalStatus.Approved });
	blogs = blogs.reverse();
	res.send({ blogs });
};

export default handleErrorMiddleware(all);
