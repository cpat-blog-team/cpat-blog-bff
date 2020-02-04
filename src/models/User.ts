import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> { }

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
