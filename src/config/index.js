import dotenv from "dotenv";

dotenv.config();

/**
 * ⚙️ APP CONFIG
 */
export const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    PORT: process.env.PORT || 3000,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || null
};

/**
 * ❗ VALIDATION (ONLY WHAT YOU NEED)
 */
if (!config.BOT_TOKEN) {
    throw new Error("❌ BOT_TOKEN is missing in environment variables");
}

/**
 * ℹ️ OPTIONAL LOG
 */
console.log("✅ Config loaded successfully");