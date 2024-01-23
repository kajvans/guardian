const bcrypt = require('bcrypt');
const PassPolicy = require('./passpolicy.js');

class PassCheck{
    constructor(BcryptSaltRounds, PassPolicyOptions) {
        this.BcryptSaltRounds = BcryptSaltRounds;
        this.PassPolicy = new PassPolicy(PassPolicyOptions);
    }

    async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(this.BcryptSaltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
}

module.exports = PassCheck;