class RateLimiter {
    constructor(events){
        if(events) {
            for(const event in events){
                events[event]["attempttimestamp"] = [];
                events[event]["lastAttempt"] = 0;
            }
        }

        this.events = events;        
        this.users = {};
    }

    addUser(user){
        this.users[user] = {};
        for(const event in this.events){
            this.users[user][event] = this.events[event];
        }

        return this.users[user];
    }

    addEvent(event, max, timespan){
        this.events[event] = {
            "max": max,
            "timespan": timespan,
            "lastAttempt": 0,
            "attempttimestamp": [],
        };

        for(const user in this.users){
            this.users[user][event] = this.events[event];
        }

        return this.events[event];
    }

    removeUser(user){
        delete this.users[user];
    }

    attemptEvent(user, event){
        if(!this.users.has(user)) return "User not found.";
        if(!this.users[user].has(event)) return "Event not found.";

        const now = Date.now();
        const max = this.users[user][event].max;
        const timespan = this.users[user][event].timespan;
        const attempttimestamp = this.users[user][event].attempttimestamp;

        for(let i = 0; i < attempttimestamp.length; i++){
            if(attempttimestamp[i] < now - timespan){
                attempttimestamp.splice(i, 1);
            }
            else {
                break;
            }
        }

        const attempts = attempttimestamp.length;

        if(attempts >= max){
            return [false, "limit reached"];
        }
        else {
            attempttimestamp.push(now);
            this.users[user][event].attempttimestamp = attempttimestamp;
            this.users[user][event].lastAttempt = now;
            return true;
        }
    }

    resetEventUser(user, event){
        if(!this.users.has(user)) return "User not found.";
        if(!this.users[user].has(event)) return "Event not found.";

        this.users[user][event].attempttimestamp = [];
        this.users[user][event].lastAttempt = 0;
    }

    resetEvent(event){
        if(!this.events.has(event)) return "Event not found.";
        for(const user in this.users){
            if(this.users[user].has(event)){
                this.users[user][event].attempttimestamp = [];
                this.users[user][event].lastAttempt = 0;
            }
        }
    }

    resetUser(user){
        if(!this.users.has(user)) return "User not found.";

        for(const event in this.users[user]){
            this.users[user][event].attempttimestamp = [];
            this.users[user][event].lastAttempt = 0;
        }
    }

    resetAll(){
        for(const user in this.users){
            for(const event in this.users[user]){
                this.users[user][event].attempttimestamp = [];
                this.users[user][event].lastAttempt = 0;
            }
        }
    }

    lastAttempt(user, event){
        if(!this.users.has(user)) return "User not found.";
        if(!this.users[user].has(event)) return "Event not found.";

        return this.users[user][event].lastAttempt;
    }

    userAttempts(user, event){
        if(!this.users.has(user)) return "User not found.";
        if(!this.users[user].has(event)) return "Event not found.";

        return this.users[user][event].attempttimestamp;
    }

    remainingAttempts(user, event){
        if(!this.users.has(user)) return "User not found.";
        if(!this.users[user].has(event)) return "Event not found.";

        const now = Date.now();
        const max = this.users[user][event].max;
        const timespan = this.users[user][event].timespan;
        const attempttimestamp = this.users[user][event].attempttimestamp;

        for(let i = 0; i < attempttimestamp.length; i++){
            if(attempttimestamp[i] < now - timespan){
                attempttimestamp.splice(i, 1);
            }
            else {
                break;
            }
        }

        const attempts = attempttimestamp.length;

        return max - attempts;
    }
}

module.exports = RateLimiter;