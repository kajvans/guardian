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
                return vertoken;
            } else {
                return undefined;
            }
        } catch (error) {
            return { valid: false, message: "Token is invalid." };
        }
    }

    decodeJWT(token: string) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        return jwt.decode(token);
    }

    getJWTExpirationDate(token: string) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = this.decodeJWT(token) as { [key: string]: any };
        return decoded.exp;
    }

    isJWTExpired(token: string) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const expirationDate = this.getJWTExpirationDate(token);
        return expirationDate < Date.now();
    }

    refreshJWT(token: string, settings: jwt.SignOptions = {}, secretKey = this.JWTSecretKey) {
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

    BlackListJWT(token: string) {
        //check if token is already blacklisted
        if (this.blacklist.includes(token)) {
            return { valid: false, message: "Token is already blacklisted." };
        }
        //add token to blacklist
        this.blacklist.push(token);
        return { valid: true, message: "Token successfully blacklisted."};
    }

    ClearBlackList() {
        //clear blacklist
        this.blacklist = [];
        return { valid: true, message: "Blacklist successfully cleared."};
    }

    GetBlackList() {
        //return blacklist
        return this.blacklist;
    }

    RemoveFromBlackList(token: string) {
        //remove token from blacklist
        if (this.blacklist.includes(token)) {
            this.blacklist = this.blacklist.filter((item) => item !== token);
            return { valid: true, message: "Token successfully removed from blacklist."};
        }
        return { valid: false, message: "Token is not blacklisted." };
    }

    IsBlackListed(token: string) {
        //check if token is blacklisted
        if (this.blacklist.includes(token)) {
            return { valid: true, message: "Token is blacklisted." };
        }
        return { valid: false, message: "Token is not blacklisted." };
    }
}