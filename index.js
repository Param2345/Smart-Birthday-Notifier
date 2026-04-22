import dotenv from "dotenv";
dotenv.config();

import { bot } from "./src/bot/bot.js";

console.log("🚀 Starting bot in polling mode...");

bot.launch({ dropPendingUpdates: true });

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));