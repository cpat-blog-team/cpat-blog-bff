import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import CommunityGuidelines from '../../models/CommunityGuidelines';

const add: RequestHandler = async (req, res) => {
  const { name, email, content, version } = req.body;
  const communityGuidelines = new CommunityGuidelines({ name, email, content, version });
  await communityGuidelines.save();

  res.send({
    message: 'Saved',
    communityGuidelines: communityGuidelines.toJSON()
  });
};

export default handleErrorMiddleware(add);
