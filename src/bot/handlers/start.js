import { UserModel } from "../../database/models.js";
import { StateManager } from "../utils/stateManager.js";

const menu = async (ctx) => {
    return ctx.reply(" Main Menu", {
        reply_markup: {
            inline_keyboard: [
                [{ text: " Add Birthday", callback_data: "add" }],
                [{ text: " Show All", callback_data: "show" }],
                [{ text: " Search", callback_data: "search" }],
                [{ text: " Upcoming", callback_data: "upcoming" }]
            ]
        }
    });
};

export const startHandler = async (ctx) => {
    const user_id = ctx.from.id;

    const user = UserModel.findById(user_id);

    if (!user) {
        StateManager.set(user_id, { action: "register", step: "name" });
        return ctx.reply(" Welcome! What's your name?");
    }

    return menu(ctx);
};

export { menu };