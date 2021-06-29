import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { decode } from '../utils/jwt.utils';
import { reIssueAccesToken } from '../services/session.service';


const deserializeUser = async  (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader: string | undefined = get(req, 'headers.authorization', undefined);

    const accessToken: string | undefined = authHeader?.replace(/^Bearer\s/, '');

    if (!accessToken) return next();

    const { decoded, isExpired } = decode(accessToken);

    if (decoded) {
        //@ts-ignore
        req.user = decoded;

        return next();
    }

    const refreshToken: string | undefined = get(req, 'headers.x-refresh', undefined);

    if (isExpired && refreshToken) {
        const newAccessToken: string | undefined = await reIssueAccesToken(refreshToken);

        if (!newAccessToken) return next();

        res.setHeader('x-refresh', newAccessToken);

        const { decoded } = decode(newAccessToken);

        //@ts-ignore
        res.user = decoded;

        return next();
    }

    return next();
}

export default deserializeUser;