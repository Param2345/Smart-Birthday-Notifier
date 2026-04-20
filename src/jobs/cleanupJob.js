import db from "../database/db.js";

/**
 * 🧹 CLEAN OLD FAILED JOBS
 */
export const cleanupJobs = () => {
    try {
        db.prepare(
            `DELETE FROM job_queue 
             WHERE status='failed' AND attempts >= 3`
        ).run();

        console.log("🧹 Cleanup completed");

    } catch (err) {
        console.error("Cleanup error:", err);
    }
};