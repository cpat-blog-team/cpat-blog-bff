import { Document, Model, Schema, model } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
}

interface IUserModel extends Model<IUser> { }

export const schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		sessionId: { type: String, required: false }
	},
	{ timestamps: true }
);

const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
