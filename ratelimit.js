class RateLimit{
    constructor(maxRequests, timeFrame){
        this.maxRequests = maxRequests;
        this.timeFrame = timeFrame;
        this.users = {};
    }

    async addUser(user){
        this.users[user] = {
            requests: this.maxRequests,
            lastRequest: Date.now()
        };
    }

    async removeUser(user){
        delete this.users[user];
    }

    async checkUser(user){
        if(!this.users[user]) await this.addUser(user);
        return this.users[user];
    }

    async checkRateLimit(user){
        const { requests, lastRequest } = await this.checkUser(user);
        const now = Date.now();
        if(now - lastRequest > this.timeFrame) {
            this.users[user].requests = this.maxRequests;
            this.users[user].lastRequest = now;
            return true;
        }
        if(requests > 0) {
            this.users[user].requests--;
            return true;
        }
        return false;
    }

    async getRateLimit(user){
        const { requests, lastRequest } = await this.checkUser(user);
        const now = Date.now();
        if(now - lastRequest > this.timeFrame) {
            this.users[user].requests = this.maxRequests;
            this.users[user].lastRequest = now;
            return this.maxRequests;
        }
        return requests;
    }

    async getRateLimitReset(user){
        const { requests, lastRequest } = await this.checkUser(user);
        const now = Date.now();
        if(now - lastRequest > this.timeFrame) {
            this.users[user].requests = this.maxRequests;
            this.users[user].lastRequest = now;
            return this.timeFrame;
        }
        return this.timeFrame - (now - lastRequest);
    }

    async getRateLimitRemaining(user){
        const { requests, lastRequest } = await this.checkUser(user);
        const now = Date.now();
        if(now - lastRequest > this.timeFrame) {
            this.users[user].requests = this.maxRequests;
            this.users[user].lastRequest = now;
            return this.maxRequests;
        }
        return requests;
    }
}

module.exports = RateLimit;