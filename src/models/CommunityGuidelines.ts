import { Document, Model, Schema, model } from 'mongoose';

export interface ICommunityGuidelines extends Document {
  name: string;
  email: string;
  content: string;
  version: number;
}

interface ICommunityGuidelinesModel extends Model<ICommunityGuidelines> { }

export const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    version: { type: Number, required: true }
  },
  { timestamps: true }
);

const CommunityGuidelines: ICommunityGuidelinesModel = model<ICommunityGuidelines, ICommunityGuidelinesModel>('CommunityGuidelines', schema);

export default CommunityGuidelines;
