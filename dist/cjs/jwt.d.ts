import * as jwt from 'jsonwebtoken';
export default class JwtAuth {
    private JWTSecretKey;
    private blacklist;
    constructor(JWTSecretKey: string);
    generateJWT(payload: {
        [key: string]: any;
    }, settings?: jwt.SignOptions, secretKey?: string): string;
    verifyJWT(token: string, secretKey?: string): jwt.JwtPayload | undefined;
    decodeJWT(token: string): jwt.JwtPayload;
    getJWTExpirationDate(token: string): number | {
        valid: boolean;
        message: string;
    };
    isJWTExpired(token: string): {
        valid: boolean;
        message: string;
    } | boolean;
    refreshJWT(token: string, settings?: jwt.SignOptions, secretKey?: string): string | {
        valid: boolean;
        message: string;
    };
    BlackListJWT(token: string): {
        valid: boolean;
        message: string;
    };
    ClearBlackList(): {
        valid: boolean;
        message: string;
    };
    GetBlackList(): string[];
    RemoveFromBlackList(token: string): {
        valid: boolean;
        message: string;
    };
    IsBlackListed(token: string): {
        valid: boolean;
        message: string;
    };
}
