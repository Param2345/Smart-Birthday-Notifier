import fs from "fs";
import path from "path";

/**
 * 💾 DATABASE BACKUP JOB
 */
export const backupDatabase = async () => {
    try {
        const source = path.resolve("birthday.db");
        const backupDir = path.resolve("backups");

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const dest = path.join(backupDir, `birthday-${timestamp}.db`);

        fs.copyFileSync(source, dest);

        console.log("💾 Backup created:", dest);

    } catch (err) {
        console.error("Backup error:", err);
    }
};