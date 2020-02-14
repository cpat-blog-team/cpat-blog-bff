import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.send({ blog });
};

export default handleErrorMiddleware(getById);