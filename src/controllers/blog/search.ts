import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';


const buildBlogSearchQuery = (userId: string) => {
	const query: any = {};

	if (userId) {
		query.userId = new RegExp(`.*${userId}.*`, 'i');
	}

	return query;
};

const search: RequestHandler = async (req, res) => {
	const { userId } = req.query;

	const query = buildBlogSearchQuery(userId);
	let blogs: Array<Object> = [];

	if(Object.entries(query).length > 0) {
		blogs = [ await Blog.findOne(query) ];
	}
	
	console.log(blogs);
	res.send({ blogs });
};

export default handleErrorMiddleware(search);
