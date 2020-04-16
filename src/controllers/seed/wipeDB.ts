import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import Blog from '../../models/Blog';
import CommunityGuidelines from '../../models/CommunityGuidelines';
import { RequestHandler } from 'express';

const wipeDB: RequestHandler = async (req, res) => {
  try {
    await Blog.deleteMany({});
    await CommunityGuidelines.deleteMany({});
    res.sendStatus(202);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default handleErrorMiddleware(wipeDB);
