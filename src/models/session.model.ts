import { Document, Schema, model } from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends Document {
    userId: UserDocument['_id'],
    isValid: boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date
}

const SessionSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        isValid: { type: Boolean, default: true },
        userAgent: { type: String }
    },
    {
        timestamps: true
    }
);

const Session = model<SessionDocument>("Session", SessionSchema);

export default Session;
