import { Document, Schema, model, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import log from '../logger';

export interface UserDocument extends Document {
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

UserSchema.pre<UserDocument>('save', async function (next: HookNextFunction) {

    const user: UserDocument = this as UserDocument;

    // only hash the password if it has been modified or is new
    if (!user.isModified('password')) return next();

    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {

    const user: UserDocument = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password)
        .catch((err: string) => {
            log.error(`${err}`);
            return false;
        });
}

const User = model<UserDocument>("User", UserSchema);

export default User;
