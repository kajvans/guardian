var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import PassPolicy from './passpolicy';
export default class PassCheck {
    constructor(BcryptSaltRounds, PassPolicyOptions) {
        this.BcryptSaltRounds = BcryptSaltRounds;
        this.PassPolicy = new PassPolicy(PassPolicyOptions);
    }
    verifyPassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(yield bcrypt.compare(password, hash));
        });
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(this.BcryptSaltRounds);
            const hash = yield bcrypt.hash(password, salt);
            return Promise.resolve(hash);
        });
    }
}
