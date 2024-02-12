type Event = {
    name: string;
    cooldown: number;
    maxAttempts: number;
    lastAttempt?: number;
    attempts?: number[];
};
type user = {
    token: string;
    events: {
        [name: string]: Event;
    };
};
export default class RateLimit {
    users: {
        [token: string]: user;
    };
    events: {
        [name: string]: Event;
    };
    constructor(users?: {
        [token: string]: user;
    }, events?: {
        [name: string]: Event;
    });
    addEvent(event: Event): boolean;
    removeEvent(name: string): boolean;
    addUser(token: string): boolean;
    removeUser(token: string): boolean;
    attempt(token: string, name: string): boolean;
    getEvents(): {
        [name: string]: Event;
    };
    getUsers(): {
        [token: string]: user;
    };
    getEvent(name: string): Event;
    getUser(token: string): user;
    remainingAttempts(token: string, name: string): number;
    resetAttempts(token: string, name: string): boolean;
    resetAllAttempts(token: string): boolean;
    resetAllUsers(): boolean;
    resetEvent(name: string): boolean;
    resetUser(token: string): boolean;
}
export {};
