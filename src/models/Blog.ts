import { Document, Model, Schema, model } from 'mongoose';

export interface IBlog extends Document {
	userId: string;
	name: string;
	title: string;
	content: string;
	version: number;
	createdAt: Date;
	updatedAt: Date;
}

interface IBlogModel extends Model<IBlog> {}

const schema = new Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	version: { type: Number, required: true },
	createdAt: { type: String, required: true },
	updatedAt: { type: String, required: true }
});

const Blog: IBlogModel = model<IBlog, IBlogModel>('Blog', schema);

export default Blog;
