import { Request, Response } from 'express';
import { createUser } from '../services/user.service';
import { UserDocument } from '../models/user.model';
import { omit } from 'lodash';
import { LeanDocument } from 'mongoose';

import log from '../logger';

/**
 * 1. create a new user
 * 2. send the user without the password parameter
 */
export async function createUserHandler(req: Request, res: Response): Promise<Response> {

    try {
        const userData: UserDocument = req.body as UserDocument;

        const newUser: UserDocument = await createUser(userData);

        const userRes: LeanDocument<Omit<UserDocument, 'password'>> = omit(newUser.toJSON(), 'password');

        return res.status(201).json(userRes);                       // 201 - created

    } catch (error) {
        log.error(error);
        return res.status(409).json(error.message);                 // 409 - conflict
    }
}
