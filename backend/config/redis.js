import Redis from "redis";

export class RedisClient {
  constructor() {
    this.redisClient = Redis.createClient(6379);
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
