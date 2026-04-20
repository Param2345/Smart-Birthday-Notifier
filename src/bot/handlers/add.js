import { BirthdayModel } from "../../database/models.js";
import { StateManager } from "../utils/stateManager.js";
import { isValidDate } from "../utils/dateUtils.js";
import { menu } from "./start.js";

export const addHandler = async (ctx) => {
    const user_id = ctx.from.id;
    const state = StateManager.get(user_id);

    if (ctx.callbackQuery) {
        StateManager.set(user_id, { action: "add", step: "name" });
        return ctx.reply("👤 Enter name:");
    }

    if (!state || state.action !== "add") return;

    // STEP 1: NAME
    if (state.step === "name") {
        StateManager.set(user_id, {
            step: "dob",
            name: ctx.message.text
        });

        return ctx.reply("📅 Enter DOB (YYYY-MM-DD):");
    }

    // STEP 2: DOB
    if (state.step === "dob") {
        const dob = ctx.message.text;

        if (!isValidDate(dob)) {
            return ctx.reply("❌ Invalid date. Use YYYY-MM-DD");
        }

        StateManager.set(user_id, {
            step: "note",
            dob
        });

        return ctx.reply("📝 Add a note (optional):");
    }

    // STEP 3: NOTE
    if (state.step === "note") {
        const { name, dob } = state;

        BirthdayModel.add({
            user_id,
            name,
            dob,
            note: ctx.message.text
        });

        StateManager.clear(user_id);

        await ctx.reply("🎉 Birthday saved!");
        return menu(ctx);
    }
};