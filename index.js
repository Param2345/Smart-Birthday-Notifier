import dotenv from "dotenv";
dotenv.config();

import { logger } from "./src/utils/logger.js";

/**
 * 🚀 BOOT SEQUENCE
 * Ensures controlled startup order
 */

const boot = async () => {
    try {
        logger.info("🚀 Booting Telegram Bot...");

        // 1. Start server FIRST
        await import("./src/server/server.js");

        // 2. Start jobs AFTER server
        await import("./src/jobs/index.js");

        logger.info("✅ Bot fully started in cloud mode");
    } catch (err) {
        logger.error("❌ Boot failed:", err);
        process.exit(1);
    }
};

boot();

/**
 * 💥 Global safety net
 */
process.on("uncaughtException", (err) => {
    logger.error("Fatal Error:", err);
});

process.on("unhandledRejection", (err) => {
    logger.error("Promise Rejection:", err);
});