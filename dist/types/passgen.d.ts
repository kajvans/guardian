export default class PasswordGenerator {
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
    Generate(length?: number): string;
}
