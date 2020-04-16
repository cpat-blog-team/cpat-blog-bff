import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';
import { RequestHandler } from 'express';

const wipeDB: RequestHandler = async (req, res) => {
  try {
    await Blog.deleteMany({});
    res.sendStatus(202);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default handleErrorMiddleware(wipeDB);
