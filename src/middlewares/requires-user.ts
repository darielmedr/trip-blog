import { NextFunction, Request, Response } from "express"
import { get } from 'lodash';

const requiresUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const user = get(req, 'user');

    if (!user) return res.sendStatus(403);                          // 403 - forbidden

    return next();
}

export default requiresUser;