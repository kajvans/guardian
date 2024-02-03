import bcrypt from 'bcrypt';
import PassPolicy from './passpolicy';

export default class PassCheck{
    private BcryptSaltRounds: number;
    private PassPolicy: PassPolicy;
    constructor(BcryptSaltRounds: number, PassPolicyOptions: { minLength: number, maxLength: number, minLower: number, minUpper: number, minNum: number, minSpecial: number, specialChars: string }) {
        this.BcryptSaltRounds = BcryptSaltRounds;
        this.PassPolicy = new PassPolicy(PassPolicyOptions);
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.BcryptSaltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
}