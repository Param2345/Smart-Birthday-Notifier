import cron from "node-cron";

import { todayReminder } from "./today/todayReminder.js";
import { preBirthdayReminder } from "./preReminder/preBirthdayReminder.js";
import { backupDatabase } from "./backupJob.js";
import { cleanupJobs } from "./cleanupJob.js";

/**
 * 🚀 JOB REGISTRY (CENTRALIZED SCHEDULER)
 */
export const startJobs = () => {

    // ⏰ Today reminder - 9:00 AM
    cron.schedule("0 9 * * *", async () => {
        await todayReminder();
    });

    // ⏰ Pre-birthday reminder - 10:00 AM
    cron.schedule("0 10 * * *", async () => {
        await preBirthdayReminder();
    });

    // backlogs
    cron.schedule("0 2 * * *", backupDatabase); // daily 2 AM

    // cleanjobs
    cron.schedule("0 3 * * 0", cleanupJobs); // weekly Sunday 3 AM

    console.log("⏰ Cron Jobs Started");
};