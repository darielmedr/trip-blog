import { SignOptions, sign, verify, JwtPayload } from "jsonwebtoken";
import config from 'config';

const privateKey: string = config.get('jwt.privateKey') as string;

export function signJwtToken(
    object: Object,
    options?: SignOptions
): string {

    return sign(object, privateKey, options);
}

export function decode(
    token: string
): {
    isExpired: boolean,
    decoded?: string | JwtPayload
} {

    try {
        const decoded: string | JwtPayload = verify(token, privateKey) as string;

        return {
            isExpired: false,
            decoded
        };
    } catch (error) {
        return {
            isExpired: error.message === 'jwt expired'
        };
    }
}