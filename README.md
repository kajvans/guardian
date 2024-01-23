
---
# Guardian - Secure Your Applications with Confidence

## Description

Guardian is a powerful JavaScript library designed to fortify your application's security with essential features for password management, authentication, and rate limiting. Whether you're developing user authentication, safeguarding against brute-force attacks, or enforcing password policies, Guardian has got you covered.

This library is easy to integrate into your project and offers a comprehensive set of features, making it a reliable choice for enhancing the security of your application.

## Installation

To install Guardian, simply run the following command using npm:

```bash
npm i auth-guardian
```

## Features

### JSON Web Token (JWT) Generation and Verification

Guardian simplifies the generation and verification of JSON Web Tokens (JWTs) with its `JwtAuth` class. JWTs are widely used for user authentication, single sign-on, and session management. Guardian streamlines JWT handling to ensure a secure authentication process in your application.

### Password Validation and Complexity Checks

With Guardian's `PassPolicy` class, you can enforce strong password complexity rules. Define minimum length, character requirements, and other policy settings to ensure that your users' passwords meet stringent security standards. Guardian helps protect your users' accounts by enforcing robust password policies.

### Password Hashing and Verification

Guardian simplifies the secure hashing and verification of passwords using the bcrypt algorithm through its `PassCheck` class. Bcrypt is a well-established and trusted password hashing algorithm. Guardian ensures that your password management is secure, enhancing the overall safety of your user data.

### Rate Limiting for Enhanced Security

Guardian offers a `RateLimiter` class to implement rate limits on actions like login attempts. Protect your application from brute-force attacks and excessive usage by controlling the rate at which users can perform specific actions. Guardian adds an extra layer of security to your application by preventing abuse.

### Secure Password Generation

Guardian's `PasswordGenerator` class allows you to generate strong, random passwords based on your specified criteria. This feature is invaluable when creating secure user accounts, managing password resets, or enhancing password security in your application.

## Usage/Examples

### for imports

#### import only jwtAuth

```javascript
const { JwtAuth } = require('guardian');
```

#### import only passPolicy

```javascript
const { PassPolicy } = require('guardian');
```

#### import only passCheck

```javascript
const { PassCheck } = require('guardian');
```

#### import only rateLimiter

```javascript
const { RateLimiter } = require('guardian');
```

#### import only passwordGenerator

```javascript
const { PasswordGenerator } = require('guardian');
```

#### import all

```javascript
const { JwtAuth, PassPolicy, PassCheck, RateLimiter, PasswordGenerator } = require('guardian');
```

### JSON Web Token (JWT) Management - JwtAuth

#### Initialize JwtAuth

```javascript
const jwtAuth = new JwtAuth('mySecretKey');
```

#### Generate a JWT

```javascript
const token = await jwtAuth.generateJWT({ userId: 123 }, { expiresIn: '1h' });
```

#### Verify a JWT

```javascript
const result = await jwtAuth.verifyJWT(token);
```

#### Decode a JWT

```javascript
const payload = await jwtAuth.decodeJWT(token);
```

#### Get JWT Expiration Date

```javascript
const expirationDate = await jwtAuth.getJWTExpirationDate(token);
```

#### Check JWT Expiration

```javascript
const isExpired = await jwtAuth.isJWTExpired(token);
```

#### Refresh a JWT

```javascript
const refreshedToken = await jwtAuth.refreshJWT(token, { expiresIn: '1h' });
```

#### Blacklist a JWT

```javascript
const result = await jwtAuth.blacklistJWT(token);
```

### Password Policy Validation - PassPolicy

#### Initialize PassPolicy

```javascript
const passPolicy = new PassPolicy({
  minLength: 8,
  minUpper: 1,
  minLower: 1,
  minNum: 1,
  minSpecial: 1,
  specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
});
```

#### Validate a Password

```javascript
const validation = passPolicy.validate('Strong1@Password');
```

#### Check Password Difference

```javascript
const differenceValidation = passPolicy.checkDifference('NewPassword123', 'OldPassword123', 5);
```

### Password Hashing and Verification - PassCheck

#### Initialize PassCheck

```javascript
const passCheck = new PassCheck(10, { minLength: 8, requireDigits: true });
```

#### Verify a Password

```javascript
const isMatch = await passCheck.verifyPassword('myPassword', 'hashedPassword');
```

#### Hash a Password

```javascript
const hashedPassword = await passCheck.hashPassword('myPassword');
```

### Rate Limiting for Enhanced Security - RateLimiter

#### Initialize RateLimiter

```javascript
const rateLimiter = new RateLimiter({
  login: { max: 5, timespan: 60000 },
  signup: { max: 3, timespan: 3600000 },
});
```

#### Add a User

```javascript
const userLimits = rateLimiter.addUser('user123');
```

#### Add an Event

```javascript
const eventLimits = rateLimiter.addEvent('login', 5, 60000);
```

#### Remove a User

```javascript
rateLimiter.removeUser('user123');
```

#### Attempt an Event

```javascript
const result = rateLimiter.attemptEvent('user123', 'login');
```

#### Reset an Event for a User

```javascript
rateLimiter.resetEventUser('user123', 'login');
```

#### Reset an Event

```javascript
rateLimiter.resetEvent('login');
```

#### Reset a User

```javascript
rateLimiter.resetUser('user123');
```

#### Reset All

```javascript
rateLimiter.resetAll();
```

#### Get Last Attempt Time

```javascript
const lastAttemptTime = rateLimiter.lastAttempt('user123', 'login');
```

#### Get User Attempts

```javascript
const allAttempts = rateLimiter.userAttempts('user123', 'login');
```

#### Get Remaining Attempts

```javascript
const remaining = rateLimiter.remainingAttempts('user123', 'login');
```

### Password Generation - PasswordGenerator

#### Initialize PasswordGenerator

```javascript
const options = {
    minLength: 8,
    maxLength: 16,
    minLower: 2,
    minUpper: 2,
    minNum: 2,
    minSpecial: 2,
    specialChars: "!@#$%^&*()_+~`|}{[]:;?><,./-="
};

const passwordGenerator = new PasswordGenerator(options);
```

#### Generate a Random Password

```javascript
const randomPassword = passwordGenerator.Generate();
```

## Notes

- Guardian offers a comprehensive set of features for enhancing the security of your applications, including JWT handling, password validation, hashing, rate limiting, and password generation.
- Each feature is encapsulated within its respective class, making it easy to integrate into your project.
- These classes provide asynchronous methods that return promises, making them suitable for use in asynchronous code.
- Ensure that you handle errors appropriately, especially when working with rate limiting to account for cases where users or events are not found or other errors occur.

- The `PassPolicy` class provides methods for validating passwords based on complexity rules and checking the difference between old and new passwords.

- The `PassCheck` class securely hashes passwords using bcrypt for storage and verification.

- The `RateLimiter` class manages rate limits for events, useful for protecting against abuse or overuse of specific functionality.

- The `JwtAuth` class simplifies JWT generation, verification, and management, including a token blacklist.

- The `PasswordGenerator` class creates random passwords based on specified criteria.

## Authors

- [kajvan](https://www.github.com/kajvans)
- [kajvan](https://gitea.quiztimes.nl/kajvans)

## License

[MIT License](https://choosealicense.com/licenses/mit/)

Guardian - Secure your applications with confidence!

---
