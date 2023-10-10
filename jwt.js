const jwt = require('jsonwebtoken');

class JwtAuth{
    constructor(JWTSecretKey){
        this.JWTSecretKey = JWTSecretKey;
        this.blacklist = [];
    }

    async generateJWT(payload, settings, secretKey = this.JWTSecretKey) {
        return jwt.sign(payload, secretKey, settings);
    }

    async verifyJWT(token, secretKey = this.JWTSecretKey) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        return jwt.verify(token, secretKey);
    }

    async decodeJWT(token) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        return jwt.decode(token);
    }

    async getJWTExpirationDate(token) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = await this.decodeJWT(token);
        return decoded.exp;
    }

    async isJWTExpired(token) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const expirationDate = await this.getJWTExpirationDate(token);
        return expirationDate < Date.now();
    }

    async refreshJWT(token, settings, secretKey = this.JWTSecretKey) {
        if(this.blacklist.includes(token)) return { valid: false, message: "Token is blacklisted." };
        const decoded = await this.verifyJWT(token, secretKey);
        const newToken = await this.generateJWT(decoded, settings, secretKey);
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