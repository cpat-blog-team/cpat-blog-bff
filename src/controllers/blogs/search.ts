import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog, { IBlog } from '../../models/Blog';

const makeQuery = ({ query }: any) => {
	let newQuery: any = {};
	const { title, id, username } = query;

	if (title) newQuery.title = title;
	if (id) newQuery._id = id;
	if (username) newQuery.name = username;

	return newQuery;
};

const search: RequestHandler = async (req, res) => {
	const query = makeQuery(req);

	let blogs: IBlog[] = [];

	if (Object.entries(query).length > 0) {
		blogs = await Blog.find(query);
	}

	res.send({ blogs });
};

export default handleErrorMiddleware(search);
