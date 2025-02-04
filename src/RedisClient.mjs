import { createClient } from 'redis';

export default class RedisClient {

    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.error('Redis Client Error', err));
        this.client.connect();
    }
    
    async quit() {
        await this.client.quit();
    }

    async generateUniqueId() {
        const key = 'unique_id_counter';
        try {
            const uniqueId = await this.client.incr(key);
            return uniqueId;
        } catch (error) {
            console.error(error);
            return null;
        }
      }

      async set(value) {
        const key = await this.generateUniqueId();

        if (!key) {
            console.error('Failed to generate unique ID');
            return null;
        }

        try {
            await this.client.set(String(key), String(value));
            return key;
        } catch (error) {
            console.error('Error setting points in database:', error);
            return null;
        }
    }   

    async get(key) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error("Failed to get id from database:", error);
            return null;
        }
    }

    async delete(key) {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error("Failed to delete id from database:", error);
        }
    }
}