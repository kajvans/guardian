export default class PassPolicy {
    private options;
    constructor(options: {
        minLength: number;
        maxLength: number;
        minLower: number;
        minUpper: number;
        minNum: number;
        minSpecial: number;
        specialChars: string;
    });
    validate(password: string): {
        valid: boolean;
        message?: string;
    };
    CheckDifference(newPassword: string, oldPassword: string, neededDifference?: number): {
        valid: boolean;
        message?: string;
    };
}
