import { Telegraf } from "telegraf";
import { config } from "../config/index.js";

import { startHandler } from "./handlers/start.js";
import { registerHandler } from "./handlers/register.js";
import { addHandler } from "./handlers/add.js";
import { showHandler } from "./handlers/show.js";
import { searchHandler } from "./handlers/search.js";
import { upcomingHandler } from "./handlers/upcoming.js";
import { deleteHandler } from "./handlers/delete.js";

import { StateManager } from "./utils/stateManager.js";
import { generateBirthdayCard } from "./utils/cardGenerator.js";

export const bot = new Telegraf(config.BOT_TOKEN);

/**
 * ❌ GLOBAL ERROR HANDLER
 */
bot.catch((err, ctx) => {
    console.error("❌ Bot Error:", err);

    if (ctx) {
        ctx.reply("⚠️ Something went wrong. Try again.");
    }
});

/**
 * 🚀 START
 */
bot.start(async (ctx) => {
    try {
        return await startHandler(ctx);
    } catch (err) {
        console.error("Start Error:", err);
    }
});

/**
 * 🧠 TEXT FLOW (REDIS SAFE)
 */
bot.on("text", async (ctx) => {
    try {
        const state = await StateManager.get(ctx.from.id);

        if (!state || !state.action) return;

        switch (state.action) {
            case "register":
                return await registerHandler(ctx);

            case "add":
                return await addHandler(ctx);

            case "search":
                return await searchHandler(ctx);

            default:
                return;
        }
    } catch (err) {
        console.error("Text Handler Error:", err);
    }
});

/**
 * 🎯 CALLBACK HANDLER
 */
bot.on("callback_query", async (ctx) => {
    try {
        await ctx.answerCbQuery();

        const data = ctx.callbackQuery.data;

        switch (data) {
            case "show":
                return await showHandler(ctx);

            case "upcoming":
                return await upcomingHandler(ctx);

            case "add":
                return await addHandler(ctx);

            case "search":
                return await searchHandler(ctx);
        }

        /**
         * ❌ DELETE
         */
        if (data.startsWith("delete_")) {
            const name = data.replace("delete_", "");
            return await deleteHandler(ctx, name);
        }

        /**
         * 🎉 BIRTHDAY IMAGE CARD
         */
        if (data.startsWith("wish_")) {
            const name = data.replace("wish_", "");

            try {
                const image = generateBirthdayCard(name);

                return await ctx.replyWithPhoto(
                    { source: image },
                    {
                        caption: `🎉 Happy Birthday ${name}! 🎂`
                    }
                );
            } catch (err) {
                console.error("Card Error:", err);
                return await ctx.reply(`🎉 Happy Birthday ${name}! 🎂`);
            }
        }

    } catch (err) {
        console.error("Callback Error:", err);
    }
});