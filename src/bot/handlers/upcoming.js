import { BirthdayModel } from "../../database/models.js";
import { daysLeft } from "../utils/dateUtils.js";

export const upcomingHandler = async (ctx) => {
    const user_id = ctx.from.id;

    const data = BirthdayModel.upcoming(user_id);

    if (!data.length) {
        return ctx.reply("📭 No data found");
    }

    const sorted = data
        .map(b => ({
            ...b,
            left: daysLeft(b.dob)
        }))
        .sort((a, b) => a.left - b.left);

    return ctx.reply(
        sorted
            .map(b => `🎂 ${b.name} → ${b.left} days`)
            .join("\n")
    );
};