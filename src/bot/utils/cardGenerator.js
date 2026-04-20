import { createCanvas } from "canvas";

/**
 * 🎂 Generate Birthday Image Card
 */
export const generateBirthdayCard = (name) => {
    const width = 800;
    const height = 400;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#ff6a00");
    gradient.addColorStop(1, "#ee0979");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Main title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px Sans";
    ctx.textAlign = "center";
    ctx.fillText("🎉 Happy Birthday 🎉", width / 2, 150);

    // Name
    ctx.font = "bold 60px Sans";
    ctx.fillText(name, width / 2, 250);

    // Footer
    ctx.font = "20px Sans";
    ctx.fillText("Wishing you a wonderful year ahead ✨", width / 2, 320);

    return canvas.toBuffer("image/png");
};