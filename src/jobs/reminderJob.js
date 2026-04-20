import cron from "node-cron";
import db from "../database/db.js";
import { bot } from "../bot/bot.js";

/**
 * 🎂 SAME DAY BIRTHDAY REMINDER
 */
cron.schedule("0 9 * * *", async () => {
    try {
        const today = new Date();
        const mmdd = today.toISOString().slice(5, 10);

        const birthdays = db.prepare(
            `SELECT * FROM birthdays WHERE substr(dob,6,5)=?`
        ).all(mmdd);

        for (const b of birthdays) {
            await bot.telegram.sendMessage(
                b.user_id,
                `🎉 *Today is ${b.name}'s Birthday!* 🎂`,
                { parse_mode: "Markdown" }
            );
        }
    } catch (err) {
        console.error("Today reminder error:", err);
    }
});


/**
 * ⏳ 1-DAY BEFORE REMINDER
 */
cron.schedule("0 10 * * *", async () => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const mmdd = tomorrow.toISOString().slice(5, 10);

        const birthdays = db.prepare(
            `SELECT * FROM birthdays WHERE substr(dob,6,5)=?`
        ).all(mmdd);

        for (const b of birthdays) {
            await bot.telegram.sendMessage(
                b.user_id,
                `⏳ Reminder: *${b.name}'s birthday is tomorrow!* 🎂`,
                { parse_mode: "Markdown" }
            );
        }
    } catch (err) {
        console.error("Pre-birthday reminder error:", err);
    }
});