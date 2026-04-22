import dotenv from "dotenv";

dotenv.config();

/**
 * ⚙️ APP CONFIG
 */
export const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    BASE_URL: process.env.BASE_URL,
    PORT: process.env.PORT || 3000,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
};

/**
 * ❗ VALIDATION (VERY IMPORTANT)
 */
if (!config.BOT_TOKEN) {
    throw new Error("❌ BOT_TOKEN is missing in environment variables");
}

if (!config.BASE_URL) {
    console.warn("⚠️ BASE_URL is missing (required for webhook)");
}