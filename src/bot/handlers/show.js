import { BirthdayModel } from "../../database/models.js";

export const showHandler = async (ctx) => {
    const user_id = ctx.from.id;

    const list = BirthdayModel.getAll(user_id);

    if (!list.length) {
        return ctx.reply("📭 No birthdays found.");
    }

    for (const b of list) {
        await ctx.reply(
            `🎂 *${b.name}*\n📅 ${b.dob}\n📝 ${b.note || "No note"}`,
            {
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "🎉 Wish", callback_data: `wish_${b.name}` },
                            { text: "❌ Delete", callback_data: `delete_${b.name}` }
                        ]
                    ]
                }
            }
        );
    }
};