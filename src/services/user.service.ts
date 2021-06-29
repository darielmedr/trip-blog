import User, { UserDocument } from "../models/user.model";
import { DocumentDefinition } from "mongoose";


export async function createUser(
    user: DocumentDefinition<UserDocument>
): Promise<UserDocument> {

    try {
        return await User.create(user);
    } catch (error) {
        throw new Error(error);
    }
}

export async function findUserById(
    id: UserDocument['_id']
): Promise<UserDocument | null> {

    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export async function findUserByEmail(
    email: UserDocument['email']
): Promise<UserDocument | null> {

    try {
        return await User.findOne({ email });
    } catch (error) {
        throw new Error(error);
    }
}

export async function validatePassword(
    user: UserDocument,
    password: string
): Promise<boolean> {

    try {
        return await user.comparePassword(password);
    } catch (error) {
        throw new Error(error);
    }
}