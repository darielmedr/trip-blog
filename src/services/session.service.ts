import config from 'config';
import { FilterQuery, LeanDocument, UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { get, omit } from "lodash";
import { SignOptions } from 'jsonwebtoken';
import { UserDocument } from "../models/user.model";
import Session, { SessionDocument } from '../models/session.model';
import { decode, signJwtToken } from '../utils/jwt.utils';
import { findUserById } from './user.service';


export async function createSession(
    userId: UserDocument['_id'],
    userAgent: string
): Promise<LeanDocument<SessionDocument>> {

    try {
        const session: SessionDocument = await Session.create({ userId, userAgent });
        return session.toJSON();

    } catch (error) {
        throw new Error(error);
    }
}

export function createAccessToken(
    user: UserDocument,
    sessionId: SessionDocument['_id']
): string {

    const userNoPassword: LeanDocument<Omit<UserDocument, 'password'>> = omit(user.toJSON(), 'password');

    const tokenData = {
        ...userNoPassword,
        session: sessionId
    };

    const jwtOptions: SignOptions = {
        expiresIn: config.get('jwt.accessTokenTtl') as string
    };

    const accessToken: string = signJwtToken(tokenData, jwtOptions);

    return accessToken;
}

export function createRefreshToken(
    session: LeanDocument<SessionDocument>
): string {

    const jwtOptions: SignOptions = {
        expiresIn: config.get('jwt.refreshTokenTtl')
    };

    const refreshToken: string = signJwtToken(session, jwtOptions);

    return refreshToken;
}

export async function reIssueAccesToken(
    refreshToken: string
): Promise<string | undefined> {

    const { decoded } = decode(refreshToken);

    if (!decoded || !get(decoded, '_id')) return undefined;

    const session = await Session.findById(get(decoded, '_id'));

    if (!session || !session.isValid) return undefined;

    const user = await findUserById(session.userId);

    if (!user) return undefined;

    const accessToken: string = createAccessToken(user, get(session, '_id'));

    return accessToken;
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
): Promise<UpdateWriteOpResult> {

    return Session.updateOne(query, update);
}

export async function findSessions(
    query: FilterQuery<SessionDocument>
): Promise<SessionDocument[]> {

    return Session.find(query).lean();
}