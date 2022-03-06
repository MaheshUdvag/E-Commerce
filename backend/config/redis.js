import Redis from "redis";

export class RedisClient {
  constructor() {
    const port = process.env.REDIS_PORT || 6379;
    console.log(process.env.REDIS_URL);
    this.redisClient = Redis.createClient({
      url: process.env.REDIS_URL || "redis://cache",
    });
    this.defaultExpiration = 3600;
  }

  connnect() {
    this.redisClient.connect();
  }

  async get(key) {
    return await this.redisClient.get(key);
  }

  async set(key, value, ex = this.defaultExpiration) {
    return await this.redisClient.setEx(key, ex, value);
  }
}
