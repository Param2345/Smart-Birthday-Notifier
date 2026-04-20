import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

/**
 * 📁 Ensure /data directory exists
 */
const DB_DIR = "/data";
const DB_PATH = path.join(DB_DIR, "birthday.db");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

/**
 * 📦 Create / open database
 */
const db = new Database(DB_PATH);

/**
 * 🧑 USERS TABLE
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
 */
db.prepare(`
CREATE TABLE IF NOT EXISTS birthdays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  dob TEXT NOT NULL,
  note TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
`).run();

export default db;