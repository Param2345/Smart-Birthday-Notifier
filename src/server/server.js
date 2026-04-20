import express from "express";
import { bot } from "../bot/bot.js";
import { config } from "../config/index.js";
import { logger } from "../utils/logger.js";

const app = express();
app.use(express.json());

/**
 * ❤️ BASIC HEALTH CHECK
 */
app.get("/", (req, res) => {
    res.status(200).send("✅ Telegram Birthday Bot is running");
});

/**
 * 🧠 ADVANCED HEALTH CHECK
 */
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

/**
 * 🤖 TELEGRAM WEBHOOK
 */
app.use(bot.webhookCallback("/bot"));

/**
 * 🔗 SAFE WEBHOOK SETTER (WITH RETRY SAFETY)
 */
const setupWebhook = async () => {
    try {
        logger.info("🔄 Setting up webhook...");

        await bot.telegram.deleteWebhook();
        await bot.telegram.setWebhook(`${config.BASE_URL}/bot`);

        logger.info("✅ Webhook successfully set");
    } catch (err) {
        logger.error("❌ Webhook setup failed:", err);
        throw err;
    }
};

/**
 * 🚀 SERVER START
 */
const startServer = async () => {
    try {
        app.listen(config.PORT, async () => {
            logger.info(`🌍 Server running on port ${config.PORT}`);

            await setupWebhook();
        });
    } catch (err) {
        logger.error("❌ Server startup error:", err);
        process.exit(1);
    }
};

startServer();

/**
 * 🛑 GRACEFUL SHUTDOWN
 */
const shutdown = async (signal) => {
    logger.warn(`🛑 Received ${signal}, shutting down...`);

    try {
        await bot.telegram.deleteWebhook();
        logger.info("Webhook removed safely");
    } catch (err) {
        logger.error("Error removing webhook:", err);
    }

    process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

/**
 * 💥 GLOBAL SAFETY NET
 */
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection:", err);
});