import Database from "better-sqlite3";

/**
 * 📦 Create / open database file
 */
const db = new Database("birthday.db");

/**
 * 🧑 USERS TABLE
 * Each Telegram user stored once
 */
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
)
`).run();

/**
 * 🎂 BIRTHDAYS TABLE
 * ALL users share same table → filtered by user_id
 */
db.prepare(`
CREATE TABLE IF NOT EXISTS job_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  message TEXT,
  status TEXT DEFAULT 'pending',
  attempts INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
`).run();

export default db;