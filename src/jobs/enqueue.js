import db from "../database/db.js";

/**
 * 📩 Add message to queue (safe delivery)
 */
export const enqueueMessage = (user_id, message) => {
    db.prepare(
        `INSERT INTO job_queue (user_id, message)
         VALUES (?, ?)`
    ).run(user_id, message);
};