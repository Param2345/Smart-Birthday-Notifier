import { BirthdayModel } from "../../database/models.js";
import { StateManager } from "../utils/stateManager.js";

export const searchHandler = async (ctx) => {
    const user_id = ctx.from.id;

    if (ctx.callbackQuery) {
        StateManager.set(user_id, { action: "search" });
        return ctx.reply("🔎 Enter name to search:");
    }

    const results = BirthdayModel.search(user_id, ctx.message.text);

    if (!results.length) {
        return ctx.reply("❌ No results found");
    }

    return ctx.reply(
        results
            .map(r => `🎂 ${r.name} - ${r.dob}`)
            .join("\n")
    );
};