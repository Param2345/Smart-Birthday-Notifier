import { config } from "../../config/index.js";

/**
 * 🎨 PREMIUM BIRTHDAY CARD (Cloudinary URL)
 */
export const generateBirthdayCard = (name) => {
    try {
        const encodedName = encodeURIComponent(name);

        const cloud = config.CLOUDINARY_CLOUD_NAME;

        return `https://res.cloudinary.com/${cloud}/image/upload/` +
            `w_800,h_400,c_fill,` +
            `co_rgb:ffffff,l_text:Arial_60_bold:🎉%20Happy%20Birthday,` +
            `g_north,y_60/` +
            `co_rgb:ffffff,l_text:Arial_70_bold:${encodedName},` +
            `g_center/` +
            `co_rgb:ffffff,l_text:Arial_30:Wishing%20you%20joy%20✨,` +
            `g_south,y_60/` +
            `b_rgb:ff6a00`;
    } catch (err) {
        console.error("Cloudinary Card Error:", err);

        return `https://dummyimage.com/800x400/000/fff&text=Happy+Birthday`;
    }
};