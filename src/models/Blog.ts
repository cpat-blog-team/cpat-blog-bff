import { Document, Model, Schema, model } from 'mongoose';

export interface IBlog {
	name: string;
	email: string;
	title: string;
	summary: string;
	content: string;
	version: number;
	date: string;
	approved: ApprovalStatus;
	review: string;
	filename: string;
}

interface IBlogDocument extends IBlog, Document { }
interface IBlogModel extends Model<IBlogDocument> { }

export enum ApprovalStatus {
	Pending = 'Pending',
	Approved = 'Approved',
	Rejected = 'Rejected'
}

export const schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		title: { type: String, required: true },
		summary: { type: String, required: true },
		content: { type: String, required: true },
		version: { type: Number, required: true },
		date: { type: String, required: true },
		approved: { type: ApprovalStatus, required: true, default: ApprovalStatus.Pending },
		review: { type: String, required: false, default: '' },
		filename: { type: String, required: false }
	},
	{ timestamps: true }
);

const Blog: IBlogModel = model<IBlogDocument, IBlogModel>('Blog', schema);

export default Blog;
