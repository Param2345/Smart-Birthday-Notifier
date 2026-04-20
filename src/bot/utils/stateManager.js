// 🧠 In-memory state store (Redis-free, lightweight)

const store = new Map();

const KEY_PREFIX = "state:";
const TTL = 60 * 60 * 1000; // 1 hour (in ms)

/**
 * 🧹 Auto-clean expired states (runs every 10 minutes)
 */
setInterval(() => {
    const now = Date.now();

    for (const [key, value] of store.entries()) {
        if (value.expires <= now) {
            store.delete(key);
        }
    }
}, 10 * 60 * 1000); // 10 min cleanup

export const StateManager = {

    /**
     * 📥 SET USER STATE
     */
    async set(user_id, data) {
        try {
            store.set(`${KEY_PREFIX}${user_id}`, {
                data,
                expires: Date.now() + TTL
            });
        } catch (err) {
            console.error("State SET error:", err);
        }
    },

    /**
     * 📤 GET USER STATE
     */
    async get(user_id) {
        try {
            const entry = store.get(`${KEY_PREFIX}${user_id}`);

            if (!entry) return null;

            // ⏳ Check expiration
            if (Date.now() > entry.expires) {
                store.delete(`${KEY_PREFIX}${user_id}`);
                return null;
            }

            return entry.data;
        } catch (err) {
            console.error("State GET error:", err);
            return null;
        }
    },

    /**
     * ❌ CLEAR USER STATE
     */
    async clear(user_id) {
        try {
            store.delete(`${KEY_PREFIX}${user_id}`);
        } catch (err) {
            console.error("State CLEAR error:", err);
        }
    }
};