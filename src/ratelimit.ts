type Event = {
    name: string;
    cooldown: number;
    maxAttempts: number;
    lastAttempt?: number;
    attempts?: number[];
};

type user = {
    token: string;
    events: { [name: string]: Event };
};

export default class RateLimit {
    constructor(public users: { [token: string]: user} = {}, public events: { [name: string]: Event} = {}) {
        this.users = users;
        this.events = events;
    }

    public addEvent(event: Event): boolean {
        try{
            this.events[event.name] = event;

            //add event to all users
            for (const token in this.users) {
                this.users[token].events[event.name] = event;
            }
    
            return true;
        } catch (error) {
            return false;
        }
    }

    public removeEvent(name: string): boolean {
        try{
            delete this.events[name];

            //remove event from all users
            for (const token in this.users) {
                delete this.users[token].events[name];
            }
    
            return true;
        } catch (error) {
            return false;
        }
    }

    public addUser(token: string): boolean {
        try{
            this.users[token] = { token, events: this.events };
            return true;
        } catch (error) {
            return false;
        }
    }

    public removeUser(token: string): boolean {
        try{
            delete this.users[token];
            return true;
        } catch (error) {
            return false;
        }
    }

    public attempt(token: string, name: string): boolean {
        try{
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
        } catch (error) {
            return false;
        }
    }

    public getEvents(): { [name: string]: Event}{
        return this.events;
    }

    public getUsers(): { [token: string]: user}{
        return this.users;
    }

    public getEvent(name: string): Event {
        return this.events[name];
    }

    public getUser(token: string): user {
        return this.users[token];
    }

    public remainingAttempts(token: string, name: string): number {
        try{
            if (!this.users[token] || !this.users[token].events[name]) {
                return -1;
            }
    
            const event = this.users[token].events[name];
    
            if (event.attempts === undefined) {
                event.attempts = [];
            }
    
            return event.maxAttempts - event.attempts.length;
        } catch (error) {
            return -1;
        }
    }

    public resetAttempts(token: string, name: string): boolean {
        try{
            if (!this.users[token] || !this.users[token].events[name]) {
                return false;
            }
    
            const event = this.users[token].events[name];
    
            event.attempts = [];
            return true;
        } catch (error) {
            return false;
        }
    }

    public resetAllAttempts(token: string): boolean {
        try{
            if (!this.users[token]) {
                return false;
            }
    
            for (const name in this.users[token].events) {
                this.resetAttempts(token, name);
            }
    
            return true;
        } catch (error) {
            return false;
        }
    }

    public resetAllUsers(): boolean {
        try{
            for (const token in this.users) {
                this.resetAllAttempts(token);
            }
    
            return true;
        } catch (error) {
            return false;
        }
    }

    public resetEvent(name: string): boolean {
        try{
            for (const token in this.users) {
                this.resetAttempts(token, name);
            }
    
            return true;
        } catch (error) {
            return false;
        }
    }

    public resetUser(token: string): boolean {
        try{
            for (const name in this.users[token].events) {
                this.resetAttempts(token, name);
            }
    
            return true;
        } catch (error) {
            return false;
        }
    }
}