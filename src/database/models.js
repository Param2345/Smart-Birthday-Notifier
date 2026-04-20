import db from "./db.js";

/**
 * 👤 USER MODEL
 */
export const UserModel = {
    create({ user_id, name }) {
        return db.prepare(
            `INSERT INTO users (user_id, name, created_at)
       VALUES (?, ?, ?)`
        ).run(user_id, name, new Date().toISOString());
    },

    findById(user_id) {
        return db.prepare(
            `SELECT * FROM users WHERE user_id = ?`
        ).get(user_id);
    }
};

/**
 * 🎂 BIRTHDAY MODEL
 */
export const BirthdayModel = {
    add({ user_id, name, dob, note }) {
        return db.prepare(
            `INSERT INTO birthdays (user_id, name, dob, note)
       VALUES (?, ?, ?, ?)`
        ).run(user_id, name, dob, note);
    },

    getAll(user_id) {
        return db.prepare(
            `SELECT * FROM birthdays WHERE user_id = ? ORDER BY dob ASC`
        ).all(user_id);
    },

    delete(user_id, name) {
        return db.prepare(
            `DELETE FROM birthdays WHERE user_id = ? AND name = ?`
        ).run(user_id, name);
    },

    search(user_id, query) {
        return db.prepare(
            `SELECT * FROM birthdays 
       WHERE user_id = ? AND name LIKE ?`
        ).all(user_id, `%${query}%`);
    },

    upcoming(user_id) {
        return db.prepare(
            `SELECT * FROM birthdays WHERE user_id = ?`
        ).all(user_id);
    }
};