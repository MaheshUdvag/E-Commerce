import Redis from "redis";

export class RedisClient {
  constructor() {
    const port = process.env.REDIS_PORT || 6379;
    this.redisClient = process.env.REDIS_URL
      ? Redis.createClient({
          url: process.env.REDIS_URL || "redis://cache",
        })
      : Redis.createClient(6379);
    this.defaultExpiration = 3600;
  }

  connnect() {
    this.redisClient.connect();
  }

  clearCache() {
    this.redisClient.flushAll("ASYNC", () => console.log("success"));
  }

  async get(key) {
    return await this.redisClient.get(key);
  }

  async set(key, value, ex = this.defaultExpiration) {
    return await this.redisClient.setEx(key, ex, value);
  }
}
