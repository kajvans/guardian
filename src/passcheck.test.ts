import PassCheck from "./passwordcheck";

describe('PassCheck', () => {
    const passCheck = new PassCheck(10, {
        minLength: 6,
        maxLength: 32,
        minLower: 2,
        minUpper: 2,
        minNum: 2,
        minSpecial: 1,
        specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    });

    const pass = "Test123!";

    it('should hash a password', async () => {
        const hash = await passCheck.hashPassword(pass);
        expect(hash).toBeDefined();
    });

    it('should verify a password', async () => {
        const hash = await passCheck.hashPassword(pass);
        const result = await passCheck.verifyPassword(pass, hash);
        expect(result).toBe(true);
    });

    it('should not verify a wrong password', async () => {
        const hash = await passCheck.hashPassword(pass);
        const result = await passCheck.verifyPassword("wrongpass", hash);
        expect(result).toBe(false);
    });

    it('should not verify a wrong hash', async () => {
        const result = await passCheck.verifyPassword(pass, "wronghash");
        expect(result).toBe(false);
    });

    it('should not verify a wrong password and hash', async () => {
        const result = await passCheck.verifyPassword("wrongpass",
            "wronghash");
        expect(result).toBe(false);
    });
});