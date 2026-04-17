import Database from 'better-sqlite3';
import { CONFIG } from '../core/constants.js';

class DatabaseService {
  constructor(dbPath = CONFIG.DB_PATH) {
    this.db = null;
    this.dbPath = dbPath;
  }

  connect() {
    try {
      this.db = new Database(this.dbPath);
      this.db.pragma('journal_mode = WAL');
      console.log('Database connected successfully');
      return this.db;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  disconnect() {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('Database disconnected');
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db;
  }

  // Run migrations
  runMigrations(migrations) {
    const db = this.getDb();
    
    // Create migrations table if not exists
    db.exec(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    for (const migration of migrations) {
      const exists = db.prepare('SELECT 1 FROM migrations WHERE name = ?').get(migration.name);
      
      if (!exists) {
        console.log(`Running migration: ${migration.name}`);
        migration.up(db);
        db.prepare('INSERT INTO migrations (name) VALUES (?)').run(migration.name);
      }
    }
  }
}

// Singleton instance
export const databaseService = new DatabaseService();
export default databaseService;
