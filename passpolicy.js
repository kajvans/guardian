class PassPolicy {
    constructor(options) {
        // Define default options and merge with provided options
        const defaultOptions = {
            minLength: 6,
            maxLength: 256,
            minLower: 1,
            minUpper: 1,
            minNum: 1,
            minSpecial: 0,
            specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
        };
        this.options = { ...defaultOptions, ...options };
    }

    validate(password) {
        const { minLength, maxLength, minLower, minUpper, minNum, minSpecial, specialChars } = this.options;

        if (password.length < minLength || password.length > maxLength) {
            return { valid: false, message: "Password length does not meet requirements." };
        }

        const lowerRegex = /[a-z]/g;
        const upperRegex = /[A-Z]/g;
        const numRegex = /[0-9]/g;
        const specialRegex = new RegExp(`[${specialChars.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}]`, "g");

        const lowerCount = (password.match(lowerRegex) || []).length;
        const upperCount = (password.match(upperRegex) || []).length;
        const numCount = (password.match(numRegex) || []).length;
        const specialCount = (password.match(specialRegex) || []).length;

        if (lowerCount < minLower) {
            return { valid: false, message: "Password must contain at least " + minLower + " lowercase letter(s)." };
        }
        if (upperCount < minUpper) {
            return { valid: false, message: "Password must contain at least " + minUpper + " uppercase letter(s)." };
        }
        if (numCount < minNum) {
            return { valid: false, message: "Password must contain at least " + minNum + " digit(s)." };
        }
        if (specialCount < minSpecial) {
            return { valid: false, message: "Password must contain at least " + minSpecial + " special character(s)." };
        }

        return { valid: true };
    }

    async CheckDifference(newPassword, oldPassword, neededDifference) {
        //check if new password is different from old password
        if (newPassword === oldPassword) {
            return { valid: false, message: "New password must be different from old password." };
        }

        //check how many characters are different
        let diffCount = 0;
        for (let i = 0; i < newPassword.length; i++) {
            if (newPassword[i] !== oldPassword[i]) {
                diffCount++;
            }
        }

        //check if difference is enough
        if (diffCount < neededDifference) {
            return { valid: false, message: "New password must be different from old password by at least " + neededDifference + " characters." };
        }
        
        return { valid: true };
    }
}

module.exports = PassPolicy;