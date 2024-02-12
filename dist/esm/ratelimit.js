export default class RateLimit {
    constructor(users = {}, events = {}) {
        this.users = users;
        this.events = events;
        this.users = users;
        this.events = events;
    }
    addEvent(event) {
        try {
            this.events[event.name] = event;
            //add event to all users
            for (const token in this.users) {
                this.users[token].events[event.name] = event;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    removeEvent(name) {
        try {
            delete this.events[name];
            //remove event from all users
            for (const token in this.users) {
                delete this.users[token].events[name];
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    addUser(token) {
        try {
            this.users[token] = { token, events: this.events };
            return true;
        }
        catch (error) {
            return false;
        }
    }
    removeUser(token) {
        try {
            delete this.users[token];
            return true;
        }
        catch (error) {
            return false;
        }
    }
    attempt(token, name) {
        try {
            if (!this.users[token] || !this.users[token].events[name]) {
                return false;
            }
            const event = this.users[token].events[name];
            if (event.attempts === undefined) {
                event.attempts = [];
            }
            const now = Date.now();
            if (event.lastAttempt && now - event.lastAttempt < event.cooldown) {
                return false;
            }
            event.lastAttempt = now;
            event.attempts.push(now);
            if (event.attempts.length > event.maxAttempts) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    getEvents() {
        return this.events;
    }
    getUsers() {
        return this.users;
    }
    getEvent(name) {
        return this.events[name];
    }
    getUser(token) {
        return this.users[token];
    }
    remainingAttempts(token, name) {
        try {
            if (!this.users[token] || !this.users[token].events[name]) {
                return -1;
            }
            const event = this.users[token].events[name];
            if (event.attempts === undefined) {
                event.attempts = [];
            }
            return event.maxAttempts - event.attempts.length;
        }
        catch (error) {
            return -1;
        }
    }
    resetAttempts(token, name) {
        try {
            if (!this.users[token] || !this.users[token].events[name]) {
                return false;
            }
            const event = this.users[token].events[name];
            event.attempts = [];
            return true;
        }
        catch (error) {
            return false;
        }
    }
    resetAllAttempts(token) {
        try {
            if (!this.users[token]) {
                return false;
            }
            for (const name in this.users[token].events) {
                this.resetAttempts(token, name);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    resetAllUsers() {
        try {
            for (const token in this.users) {
                this.resetAllAttempts(token);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    resetEvent(name) {
        try {
            for (const token in this.users) {
                this.resetAttempts(token, name);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    resetUser(token) {
        try {
            for (const name in this.users[token].events) {
                this.resetAttempts(token, name);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
