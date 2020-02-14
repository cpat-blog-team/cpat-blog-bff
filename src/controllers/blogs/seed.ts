import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';
import { RequestHandler } from 'express';

const seed: RequestHandler = async (req, res) => {
  const blogs = await Blog.deleteMany({});
  res.send({ blogs });
};

export default handleErrorMiddleware(seed);
