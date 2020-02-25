import { Document, Model, Schema, model } from 'mongoose';

export interface IBlog extends Document {
	userId: string;
	username: string;
	title: string;
	summary: string;
	content: string;
	version: number;
}

interface IBlogModel extends Model<IBlog> {}

const schema = new Schema(
	{
		userId: { type: String, required: true },
		username: { type: String, required: true },
		title: { type: String, required: true },
		summary: { type: String, required: true },
		content: { type: String, required: true },
		version: { type: Number, required: true }
	},
	{ timestamps: true }
);

const Blog: IBlogModel = model<IBlog, IBlogModel>('Blog', schema);

export default Blog;
