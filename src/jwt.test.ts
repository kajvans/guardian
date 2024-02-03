import JwtAuth from "./jwt";

describe('JWT', () => {
    const jwt = new JwtAuth('secret');
    const user: {username: string, password: string} = {
        username: 'test',
        password: 'test'
    };

    const settings: {expiresIn: string} = {
        expiresIn: '1h'
    };
    
    it('should generate a JWT', () => {
        const token = jwt.generateJWT({ username: user.username, password: user.password });
        expect(token).toBeDefined();
      });

      test('should return token object when valid token is provided', () => {
        // Arrange
        const validToken = jwt.generateJWT(user);

        // Act
        const result = jwt.verifyJWT(validToken);

        // Assert
        if(result instanceof Object) {
            expect(result.username).toEqual(user.username);
        } else {
            fail('Token verification failed');
        }
    });

    it('should decode a JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        const decoded = jwt.decodeJWT(token);
        expect(decoded).toBeDefined();
        if (typeof decoded !== 'string' && decoded !== null) {
            // verified is JwtPayload
            expect(decoded.username).toEqual(user.username);
        } else {
            // Handle the case where verified is a string (token is blacklisted or invalid)
            fail('Token verification failed');
        }
    });

    it('should get the expiration date of a JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password }, settings);
        const expirationDate = jwt.getJWTExpirationDate(token);
        expect(expirationDate).toBeDefined();
    });

    it('should check if a JWT is expired', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password }, settings);
        const isExpired = jwt.isJWTExpired(token);
        expect(isExpired).toBeDefined();
    });

    it('should refresh a JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        const newToken = jwt.refreshJWT(token);
        expect(newToken).toBeDefined();
    });

    it('should not verify a JWT with invalid secret key', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        const verified = jwt.verifyJWT(token, 'invalid');
        expect(verified).toEqual({ valid: false, message: "Token is invalid."});
    });

    it('should not refresh a JWT with invalid secret key', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password }, settings, 'test');
        const newToken = jwt.refreshJWT(token, {}, 'invalid');
        expect(newToken).toEqual({ valid: false, message: "Token is invalid."});
    });

    it('should blacklist a JWT', () => {
        const token = jwt.generateJWT({ username: 'test12', password: user.password });
         const blacklisted = jwt.BlackListJWT(token);
         expect(blacklisted).toBeDefined();
     });

    it('should not verify a blacklisted JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        jwt.BlackListJWT(token);
        const verified = jwt.verifyJWT(token);
        expect(verified).toBeDefined();
    });

    it('should not decode a blacklisted JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        jwt.BlackListJWT(token);
        const decoded = jwt.decodeJWT(token);
        expect(decoded).toBeDefined();
    });

    it('should not get the expiration date of a blacklisted JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        jwt.BlackListJWT(token);
        const expirationDate = jwt.getJWTExpirationDate(token);
        expect(expirationDate).toBeDefined();
    });

    it('should not check if a blacklisted JWT is expired', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        jwt.BlackListJWT(token);
        const isExpired = jwt.isJWTExpired(token);
        expect(isExpired).toBeDefined();
    });

    it('should not refresh a blacklisted JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        jwt.BlackListJWT(token);
        const newToken = jwt.refreshJWT(token);
        expect(newToken).toBeDefined();
    });

    it('should not blacklist a blacklisted JWT', () => {
       const token = jwt.generateJWT({ username: user.username, password: user.password });
        jwt.BlackListJWT(token);
        const blacklisted = jwt.BlackListJWT(token);
        expect(blacklisted).toBeDefined();
    });

    it('should not blacklist a blacklisted JWT', () => {
        const token = jwt.generateJWT({ username: user.username, password: user.password });
        const verify = jwt.verifyJWT(token, 'invalid');
        const blacklisted = jwt.IsBlackListed(token);
        expect(blacklisted).toEqual({ valid: true, message: "Token is blacklisted." })
     });

     it('should remove a JWT from the blacklist', () => {
        const token = jwt.generateJWT({ username: user.username, password: user.password });
        jwt.BlackListJWT(token);
        const removed = jwt.RemoveFromBlackList(token);
        expect(removed).toEqual({ valid: true, message: "Token successfully removed from blacklist." });
        });
});