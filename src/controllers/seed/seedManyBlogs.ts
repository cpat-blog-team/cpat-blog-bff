import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog, { IBlog } from '../../models/Blog';
import { RequestHandler } from 'express';

const seedManyBlogs: RequestHandler = async (req, res) => {
  let seedArray: IBlog[] = req.body.blogs || [];

  try {
    const blogs = await Blog.create(seedArray);
    res.send({ blogs });
  } catch (err) {
    res.status(500).send(err);
  }
};

export default handleErrorMiddleware(seedManyBlogs);
