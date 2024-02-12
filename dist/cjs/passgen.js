"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordGenerator {
    constructor(options) {
        const defaultOptions = {
            minLength: 6,
            maxLength: 32,
            minLower: 2,
            minUpper: 2,
            minNum: 2,
            minSpecial: 3,
            specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
        };
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
    }
    Generate(length = 0) {
        // Generate random password that complies with the options
        const { minLength, maxLength, minLower, minUpper, minNum, minSpecial, specialChars } = this.options;
        let pass = "";
        let lowerRegex = 'abcdefghijklmnopqrstuvwxyz';
        let upperRegex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let numRegex = '0123456789';
        // Generate password
        //generate random length
        if (length === undefined || length < minLength || length > maxLength || length === 0) {
            length = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);
        }
        //generate random length for each character type
        let lowerLength = Math.floor(Math.random() * (length - minLower - minUpper - minNum - minSpecial + 1) + minLower);
        let upperLength = Math.floor(Math.random() * (length - lowerLength - minUpper - minNum - minSpecial + 1) + minUpper);
        let numLength = Math.floor(Math.random() * (length - lowerLength - upperLength - minNum - minSpecial + 1) + minNum);
        let specialLength = Math.floor(Math.random() * (length - lowerLength - upperLength - numLength - minSpecial + 1) + minSpecial);
        //generate random characters
        for (let i = 0; i < lowerLength; i++) {
            pass += lowerRegex[Math.floor(Math.random() * lowerRegex.length)];
        }
        for (let i = 0; i < upperLength; i++) {
            pass += upperRegex[Math.floor(Math.random() * upperRegex.length)];
        }
        for (let i = 0; i < numLength; i++) {
            pass += numRegex[Math.floor(Math.random() * numRegex.length)];
        }
        for (let i = 0; i < specialLength; i++) {
            pass += specialChars[Math.floor(Math.random() * specialChars.length)];
        }
        //shuffle password
        pass = pass.split('').sort(function () { return 0.5 - Math.random(); }).join('');
        return pass;
    }
}
exports.default = PasswordGenerator;
