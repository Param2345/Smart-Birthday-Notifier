import { redis } from "../../config/redis.js";

const KEY_PREFIX = "state:";

export const StateManager = {

    async set(user_id, data) {
        try {
            await redis.set(
                `${KEY_PREFIX}${user_id}`,
                JSON.stringify(data),
                "EX",
                3600
            );
        } catch (err) {
            console.error("State SET error:", err);
        }
    },

    async get(user_id) {
        try {
            const data = await redis.get(`${KEY_PREFIX}${user_id}`);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error("State GET error:", err);
            return null;
        }
    },

    async clear(user_id) {
        try {
            await redis.del(`${KEY_PREFIX}${user_id}`);
        } catch (err) {
            console.error("State CLEAR error:", err);
        }
    }
};