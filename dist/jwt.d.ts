import * as jwt from 'jsonwebtoken';
export default class JwtAuth {
    private JWTSecretKey;
    private blacklist;
    constructor(JWTSecretKey: string);
    generateJWT(payload: {
        [key: string]: any;
    }, settings?: jwt.SignOptions, secretKey?: string): string;
    verifyJWT(token: string, secretKey?: string): jwt.JwtPayload | undefined;
    decodeJWT(token: string): string | jwt.JwtPayload | null;
    getJWTExpirationDate(token: string): any;
    isJWTExpired(token: string): boolean | {
        valid: boolean;
        message: string;
    };
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
