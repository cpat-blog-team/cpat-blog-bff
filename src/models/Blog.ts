import { Document, Model, Schema, model } from 'mongoose';

export interface IBlog extends Document {
	name: string;
	email: string;
	title: string;
	summary: string;
	content: string;
	version: number;
	date: string;
	approved: boolean;
}

interface IBlogModel extends Model<IBlog> { }

export const schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		title: { type: String, required: true },
		summary: { type: String, required: true },
		content: { type: String, required: true },
		version: { type: Number, required: true },
		date: { type: String, required: true },
		approved: { type: Boolean, required: true }
	},
	{ timestamps: true }
);

const Blog: IBlogModel = model<IBlog, IBlogModel>('Blog', schema);

export default Blog;
