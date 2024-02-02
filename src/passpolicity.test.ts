import PassPolicy from "./passpolicy";

describe("PassPolicy", () => {
    const passPolicy = new PassPolicy({
        minLength: 6,
        maxLength: 32,
        minLower: 2,
        minUpper: 2,
        minNum: 2,
        minSpecial: 1,
        specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    });

    it("should validate a password", () => {
        const pass = "TesT123!";
        const result = passPolicy.validate(pass);
        expect(result.valid).toBe(true);
    });

    it("should check the difference between two passwords", () => {
        const pass1 = "Test123!";
        const pass2 = "Test123456!";
        const result = passPolicy.CheckDifference(pass1, pass2 , 4);
        expect(result.valid).toBe(true);
    });
});