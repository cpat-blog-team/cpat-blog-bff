import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import CommunityGuidelines from '../../models/CommunityGuidelines';

const add: RequestHandler = async (req, res) => {
  const { name, email, content } = req.body;
  const date = new Date().toDateString();
  const title = 'Community Guidelines';
  const version = await CommunityGuidelines.collection.count();
  const communityGuidelines = new CommunityGuidelines({
    name,
    email,
    content,
    version,
    date,
    title
  });
  await communityGuidelines.save();

  res.send({
    message: 'Saved',
    communityGuidelines: communityGuidelines.toJSON()
  });
};

export default handleErrorMiddleware(add);
