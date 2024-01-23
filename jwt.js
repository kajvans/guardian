const jwt = require('jsonwebtoken');

class JwtAuth{
    constructor(JWTSecretKey){
        this.JWTSecretKey = JWTSecretKey;
        this.blacklist = [];
    }

    generateJWT(payload, settings, secretKey = this.JWTSecretKey) {
        return jwt.sign(payload, secretKey, settings);
    }

    verifyJWT(token, secretKey = this.JWTSecretKey) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        return jwt.verify(token, secretKey);
    }

    decodeJWT(token) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        return jwt.decode(token);
    }

    getJWTExpirationDate(token) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = this.decodeJWT(token);
        return decoded.exp;
    }

    isJWTExpired(token) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const expirationDate = this.getJWTExpirationDate(token);
        return expirationDate < Date.now();
    }

    refreshJWT(token, settings, secretKey = this.JWTSecretKey) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = this.verifyJWT(token, secretKey);
        const newToken = this.generateJWT(decoded, settings, secretKey);
        return newToken;
    }

    async BlackListJWT(token) {
        //check if token is already blacklisted
        if (this.blacklist.includes(token)) {
            return { valid: false, message: "Token is already blacklisted." };
        }
        //add token to blacklist
        this.blacklist.push(token);
        return { valid: true, message: "Token successfully blacklisted."};
    }
}

module.exports = JwtAuth;