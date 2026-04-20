import { UserModel } from "../../database/models.js";
import { StateManager } from "../utils/stateManager.js";
import { menu } from "./start.js";

export const registerHandler = async (ctx) => {
    const user_id = ctx.from.id;
    const state = StateManager.get(user_id);

    if (!state || state.action !== "register") return;

    if (state.step === "name") {
        const name = ctx.message.text;

        UserModel.create({
            user_id,
            name
        });

        StateManager.clear(user_id);

        await ctx.reply(` Welcome ${name}!`);
        return menu(ctx);
    }
};