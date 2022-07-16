import Redis from "redis";

export class RedisClient {
  constructor() {
    this.defaultExpiration = 3600;
    if (process.env.NODE_ENV === "production") {
      this.redisClient = Redis.createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      });
    } else {
      this.redisClient = Redis.createClient();
    }
  }

  async connnect() {
    await this.redisClient.connect();
  }

  clearCache() {
    this.redisClient.flushAll("ASYNC", () => console.log("success"));
  }

  async get(key) {
    return await this.redisClient.get(key);
  }

  async set(key, value, ex = this.defaultExpiration) {
    console.log(key);
    return await this.redisClient.setEx(key, ex, value);
  }
}
