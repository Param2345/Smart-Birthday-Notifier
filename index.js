import dotenv from "dotenv";
dotenv.config();

import { bot } from "./src/bot/bot.js";

const startBot = async () => {
    try {
        console.log("🚀 Starting bot in polling mode...");

        await bot.launch({
            dropPendingUpdates: true
        });

        console.log("✅ Bot is running successfully");

    } catch (err) {
        console.error("❌ Failed to start bot:", err);
        process.exit(1);
    }
};

startBot();

/**
 * 🛑 GRACEFUL SHUTDOWN
 */
process.once("SIGINT", () => {
    console.log("🛑 SIGINT received");
    bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
    console.log("🛑 SIGTERM received");
    bot.stop("SIGTERM");
});