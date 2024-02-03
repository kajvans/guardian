import * as jwt from 'jsonwebtoken';

export default class JwtAuth{
    private JWTSecretKey: string;
    private blacklist: string[];

    public constructor(JWTSecretKey: string){
        this.JWTSecretKey = JWTSecretKey;
        this.blacklist = [];
    }

    generateJWT(payload: { [key: string]: any}, settings: jwt.SignOptions = {}, secretKey = this.JWTSecretKey): string {
        return jwt.sign(payload, secretKey, settings);
    }

    verifyJWT(token: string, secretKey = this.JWTSecretKey) {
        try{
            if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
            const vertoken = jwt.verify(token, secretKey);
            
            if(vertoken instanceof Object) {
                return (vertoken);
            } else {
                return undefined;
            }
        } catch (error) {
            return { valid: false, message: "Token is invalid." };
        }
    }

    decodeJWT(token: string) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = jwt.decode(token);
        if(decoded instanceof Object) {
            return decoded;
        } else {
            return {valid: false, message: "Token is invalid."};
        }
    }

    getJWTExpirationDate(token: string): number | { valid: boolean, message: string} {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = this.decodeJWT(token) as { [key: string]: any };
        return decoded.exp ;
    }

    isJWTExpired(token: string): { valid: boolean, message: string} | boolean{
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const expirationDate = this.getJWTExpirationDate(token);
        if(expirationDate instanceof Object) return expirationDate;
        return expirationDate < (Date.now() / 1000);
    }

    refreshJWT(token: string, settings: jwt.SignOptions = {}, secretKey = this.JWTSecretKey): string | { valid: boolean, message: string} {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = this.verifyJWT(token, secretKey);

        if(decoded instanceof Object) {
            if(decoded.valid == false) return { valid: false, message: "Token is invalid." };

            let payLoadArray: { [key: string]: any } = {};

            if (decoded instanceof Object) {
                payLoadArray = decoded as { [key: string]: any };
            } else {
                return { valid: false, message: "Token is invalid." };
            }
    
            const newToken = this.generateJWT(payLoadArray, settings, secretKey);
            return newToken;
        }
        return { valid: false, message: "Token is invalid." };
    }

    BlackListJWT(token: string): { valid: boolean, message: string}{
        //check if token is already blacklisted
        if (this.blacklist.includes(token)) {
            return { valid: false, message: "Token is already blacklisted." };
        }
        //add token to blacklist
        this.blacklist.push(token);
        return { valid: true, message: "Token successfully blacklisted."};
    }

    ClearBlackList(): { valid: boolean, message: string}{
        //clear blacklist
        this.blacklist = [];
        return { valid: true, message: "Blacklist successfully cleared."};
    }

    GetBlackList(): string[] {
        //return blacklist
        return this.blacklist;
    }

    RemoveFromBlackList(token: string): { valid: boolean, message: string}{
        //remove token from blacklist
        if (this.blacklist.includes(token)) {
            this.blacklist = this.blacklist.filter((item) => item !== token);
            return { valid: true, message: "Token successfully removed from blacklist."};
        }
        return { valid: false, message: "Token is not blacklisted." };
    }

    IsBlackListed(token: string): { valid: boolean, message: string}{
        //check if token is blacklisted
        if (this.blacklist.includes(token)) {
            return { valid: true, message: "Token is blacklisted." };
        }
        return { valid: false, message: "Token is not blacklisted." };
    }
}