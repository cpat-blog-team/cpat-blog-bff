import { Document, Model, Schema, model } from 'mongoose';

export interface ICommunityGuidelines {
  name: string;
  email: string;
  content: string;
  version: number;
  date: string;
}

interface ICommunityGuidelinesDocument extends Document, ICommunityGuidelines {
  title: string;
}
interface ICommunityGuidelinesModel extends Model<ICommunityGuidelinesDocument> { }

export const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    version: { type: Number, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true, default: 'Community Guidelines' }
  },
  { timestamps: true }
);

const CommunityGuidelines: ICommunityGuidelinesModel = model<ICommunityGuidelinesDocument, ICommunityGuidelinesModel>('CommunityGuidelines', schema);

export default CommunityGuidelines;
