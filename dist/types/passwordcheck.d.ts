export default class PassCheck {
    private BcryptSaltRounds;
    private PassPolicy;
    constructor(BcryptSaltRounds: number, PassPolicyOptions: {
        minLength: number;
        maxLength: number;
        minLower: number;
        minUpper: number;
        minNum: number;
        minSpecial: number;
        specialChars: string;
    });
    verifyPassword(password: string, hash: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
