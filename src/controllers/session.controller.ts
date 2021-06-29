import { Request, Response } from 'express';
import { LeanDocument } from 'mongoose';
import { UserDocument } from '../models/user.model';
import { findUserByEmail, validatePassword } from '../services/user.service';
import { createAccessToken, createRefreshToken, createSession, findSessions, updateSession } from '../services/session.service';
import { SessionDocument } from '../models/session.model';
import { get } from 'lodash';

import log from '../logger';


/**
 * 1. validate email and password
 * 2. create a session
 * 3. create access token
 * 4. create refresh token
 * 5. send the tokens
 */
export async function createUserSession(req: Request, res: Response): Promise<Response> {

    try {
        const { email, password } = req.body;

        const user: UserDocument | null = await findUserByEmail(email);

        if (!user) return res.status(404).send('Invalid email');                     // 404 not found

        const isPasswordValid: boolean = await validatePassword(user, password);

        if (!isPasswordValid) return res.status(401).send('Invalid password');      // 401 unauthorized

        const session: LeanDocument<SessionDocument> = await createSession(user._id, req.get('user-agent') || '');

        const accessToken: string = createAccessToken(user, session._id);

        const refreshToken: string = createRefreshToken(session);

        return res.status(201).json({ accessToken, refreshToken });                 // 201 created

    } catch (error) {
        log.error(error);
        return res.status(500).json(error.message);                                 // 500 - internal server error
    }
}

export async function getUserSessions(req: Request, res: Response): Promise<Response> {

    const userId = get(req, 'user._id');

    const sessions = await findSessions({ userId, isValid: true });

    return res.status(200).json(sessions);
}

export async function invalidateUserSession(req: Request, res: Response): Promise<Response> {

    try {
        const sessionId = get(req, 'user.session');

        await updateSession({ _id: sessionId }, { isValid: false });

        return res.sendStatus(200);

    } catch (error) {
        log.error(error);
        return res.status(500).json(error.message);                                 // 500 - internal server error
    }
}