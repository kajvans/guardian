"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
class JwtAuth {
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
                return vertoken;
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
        return jwt.decode(token);
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
        return expirationDate < Date.now();
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
exports.default = JwtAuth;
