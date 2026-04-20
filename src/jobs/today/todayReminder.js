import db from "../../database/db.js";
import { enqueueMessage } from "../enqueue.js";

/**
 * 🎉 TODAY BIRTHDAY NOTIFICATION (QUEUE VERSION)
 */
export const todayReminder = async () => {
    try {
        const today = new Date();
        const mmdd = today.toISOString().slice(5, 10);

        const birthdays = db.prepare(
            `SELECT * FROM birthdays WHERE substr(dob,6,5)=?`
        ).all(mmdd);

        for (const b of birthdays) {
            enqueueMessage(
                b.user_id,
                `🎉 Today is *${b.name}'s Birthday!* 🎂`
            );
        }

    } catch (err) {
        console.error("Today Reminder Error:", err);
    }
};