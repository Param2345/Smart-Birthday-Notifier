import db from "../database/db.js";
import { bot } from "../bot/bot.js";

/**
 * 🔁 Retry-safe message sender
 */
export const processQueue = async () => {
    const jobs = db.prepare(
        `SELECT * FROM job_queue WHERE status='pending' AND attempts < 3 LIMIT 20`
    ).all();

    for (const job of jobs) {
        try {
            await bot.telegram.sendMessage(job.user_id, job.message);

            db.prepare(
                `UPDATE job_queue SET status='sent' WHERE id=?`
            ).run(job.id);

        } catch (err) {
            console.error("Queue send error:", err);

            db.prepare(
                `UPDATE job_queue 
                 SET attempts = attempts + 1 
                 WHERE id=?`
            ).run(job.id);
        }
    }
};