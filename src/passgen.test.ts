import PasswordGenerator from "./passgen";

describe('PasswordGenerator', () => {
    const passgen = new PasswordGenerator({
        minLength: 6,
        maxLength: 32,
        minLower: 2,
        minUpper: 2,
        minNum: 2,
        minSpecial: 3,
        specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    });

    it('should generate a password', async () => {
        const pass = await passgen.Generate();
        expect(pass).toBeDefined();
    });

    it('should generate a password with a specific length', async () => {
        const pass = await passgen.Generate(12);
        expect(pass.length).toEqual(12);
    });
});