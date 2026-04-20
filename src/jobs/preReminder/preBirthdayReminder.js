import db from "../../database/db.js";
import { enqueueMessage } from "../enqueue.js";

/**
 * ⏳ 1 DAY BEFORE BIRTHDAY NOTIFICATION (QUEUE VERSION)
 */
export const preBirthdayReminder = async () => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const mmdd = tomorrow.toISOString().slice(5, 10);

        const birthdays = db.prepare(
            `SELECT * FROM birthdays WHERE substr(dob,6,5)=?`
        ).all(mmdd);

        for (const b of birthdays) {
            enqueueMessage(
                b.user_id,
                `⏳ Reminder: *${b.name}'s birthday is tomorrow!* 🎂`
            );
        }

    } catch (err) {
        console.error("Pre Reminder Error:", err);
    }
};