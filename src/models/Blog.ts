import { Document, Model, Schema, model } from 'mongoose';

export interface IBlog extends Document {
	userId: string;
	username: string;
	title: string;
	summary: string;
	content: string;
	version: number;
	createdAt: Date;
	updatedAt: Date;
}

interface IBlogModel extends Model<IBlog> { }

const schema = new Schema({
	userId: { type: String, required: true },
	username: { type: String, required: true },
	title: { type: String, required: true },
	summary: { type: String, required: true },
	content: { type: String, required: true },
	version: { type: Number, required: true },
	createdAt: { type: Date, required: false },
	updatedAt: { type: Date, required: false }
});

const Blog: IBlogModel = model<IBlog, IBlogModel>('Blog', schema);

export default Blog;
