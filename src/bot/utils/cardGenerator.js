// 🎂 Generate Birthday Image URL (NO CANVAS, CLOUD SAFE)

export const generateBirthdayCard = (name) => {
    try {
        const encodedName = encodeURIComponent(name);

        // 🎨 Orange gradient-like background with white text
        return `https://dummyimage.com/800x400/ff6a00/ffffff&text=🎉+Happy+Birthday+${encodedName}+🎂`;
    } catch (err) {
        console.error("Card Generator Error:", err);

        // fallback
        return `https://dummyimage.com/800x400/000/fff&text=Happy+Birthday`;
    }
};