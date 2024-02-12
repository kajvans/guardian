import * as jwt from 'jsonwebtoken';
export default class JwtAuth {
    constructor(JWTSecretKey) {
        this.JWTSecretKey = JWTSecretKey;
        this.blacklist = [];
    }
    generateJWT(payload, settings = {}, secretKey = this.JWTSecretKey) {
        return jwt.sign(payload, secretKey, settings);
    }
    verifyJWT(token, secretKey = this.JWTSecretKey) {
        try {
            if (this.blacklist.includes(token))
                return { valid: false, message: "Token is blacklisted." };
            const vertoken = jwt.verify(token, secretKey);
            if (vertoken instanceof Object) {
                return (vertoken);
            }
            else {
                return undefined;
            }
        }
        catch (error) {
            return { valid: false, message: "Token is invalid." };
        }
    }
    decodeJWT(token) {
        if (this.blacklist.includes(token))
            return { valid: false, message: "Token is blacklisted." };
        const decoded = jwt.decode(token);
        if (decoded instanceof Object) {
            return decoded;
        }
        else {
            return { valid: false, message: "Token is invalid." };
        }
    }
    getJWTExpirationDate(token) {
        if (this.blacklist.includes(token))
            return { valid: false, message: "Token is blacklisted." };
        const decoded = this.decodeJWT(token);
        return decoded.exp;
    }
    isJWTExpired(token) {
        if (this.blacklist.includes(token))
            return { valid: false, message: "Token is blacklisted." };
        const expirationDate = this.getJWTExpirationDate(token);
        if (expirationDate instanceof Object)
            return expirationDate;
        return expirationDate < (Date.now() / 1000);
    }
    refreshJWT(token, settings = {}, secretKey = this.JWTSecretKey) {
        if (this.blacklist.includes(token))
            return { valid: false, message: "Token is blacklisted." };
        const decoded = this.verifyJWT(token, secretKey);
        if (decoded instanceof Object) {
            if (decoded.valid == false)
                return { valid: false, message: "Token is invalid." };
            let payLoadArray = {};
            if (decoded instanceof Object) {
                payLoadArray = decoded;
            }
            else {
                return { valid: false, message: "Token is invalid." };
            }
            const newToken = this.generateJWT(payLoadArray, settings, secretKey);
            return newToken;
        }
        return { valid: false, message: "Token is invalid." };
    }
    BlackListJWT(token) {
        //check if token is already blacklisted
        if (this.blacklist.includes(token)) {
            return { valid: false, message: "Token is already blacklisted." };
        }
        //add token to blacklist
        this.blacklist.push(token);
        return { valid: true, message: "Token successfully blacklisted." };
    }
    ClearBlackList() {
        //clear blacklist
        this.blacklist = [];
        return { valid: true, message: "Blacklist successfully cleared." };
    }
    GetBlackList() {
        //return blacklist
        return this.blacklist;
    }
    RemoveFromBlackList(token) {
        //remove token from blacklist
        if (this.blacklist.includes(token)) {
            this.blacklist = this.blacklist.filter((item) => item !== token);
            return { valid: true, message: "Token successfully removed from blacklist." };
        }
        return { valid: false, message: "Token is not blacklisted." };
    }
    IsBlackListed(token) {
        //check if token is blacklisted
        if (this.blacklist.includes(token)) {
            return { valid: true, message: "Token is blacklisted." };
        }
        return { valid: false, message: "Token is not blacklisted." };
    }
}
