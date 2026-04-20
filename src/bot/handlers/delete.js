import { BirthdayModel } from "../../database/models.js";

export const deleteHandler = async (ctx, name) => {
    BirthdayModel.delete(ctx.from.id, name);
    return ctx.reply("🗑 Deleted successfully");
};