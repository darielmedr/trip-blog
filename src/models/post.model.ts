import { Document, model, Schema } from "mongoose";
import { UserDocument } from './user.model';

export interface PostDocument extends Document {
    userId: UserDocument['_id'],
    title: string,
    body: string
}

const PostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    body: { type: String }
});

const Post = model<PostDocument>("Post", PostSchema);

export default Post;