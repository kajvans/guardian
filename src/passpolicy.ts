export default class PassPolicy {
    private options: { minLength: number, maxLength: number, minLower: number, minUpper: number, minNum: number, minSpecial: number, specialChars: string };
    constructor(options: { minLength: number, maxLength: number, minLower: number, minUpper: number, minNum: number, minSpecial: number, specialChars: string }){
        const defaultOptions = {
            minLength: 6,
            maxLength: 32,
            minLower: 2,
            minUpper: 2,
            minNum: 2,
            minSpecial: 3,
            specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
        };
        this.options = { ...defaultOptions, ...options };
    }

    validate(password: string): { valid: boolean, message?: string }{
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

    CheckDifference(newPassword: string, oldPassword: string, neededDifference: number = 3): { valid: boolean, message?: string }{
        //check if new password is different from old password
        if (newPassword === oldPassword) {
            return { valid: false, message: "New password must be different from old password." };
        }

        //check how many characters are different
        let diffCount = 0;
        //check if new password is longer than old password
        if (newPassword.length > oldPassword.length) {
            for (let i = 0; i < oldPassword.length; i++) {
                if (newPassword[i] != oldPassword[i]) {
                    diffCount++;
                }
            }
            diffCount += newPassword.length - oldPassword.length;
        } else {
            for (let i = 0; i < newPassword.length; i++) {
                if (newPassword[i] != oldPassword[i]) {
                    diffCount++;
                }
            }
            diffCount += oldPassword.length - newPassword.length;
        }

        //check if difference is enough
        if (diffCount < neededDifference) {
            return { valid: false, message: "New password must be different from old password by at least " + neededDifference + " characters." };
        }
        
        return { valid: true };
    }
}