import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import CommunityGuidelines, { ICommunityGuidelines } from '../../models/CommunityGuidelines';

const getLatest: RequestHandler = async (req, res) => {
  const communityGuidelines = await CommunityGuidelines.findOne().sort('-version');
  res.send({ communityGuidelines });
};

export default handleErrorMiddleware(getLatest);
