/**
 * Initial database migration - Create items table
 */
export const createItemsTable = {
  name: '001_create_items_table',
  up: (db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL CHECK(type IN ('lesson', 'quiz', 'article', 'video')),
        content TEXT,
        isFavorite INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    // Create indexes for better search performance
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);
      CREATE INDEX IF NOT EXISTS idx_items_favorite ON items(isFavorite);
      CREATE INDEX IF NOT EXISTS idx_items_created ON items(createdAt DESC);
    `);

    console.log('Items table created successfully');
  }
};

/**
 * Migration runner
 */
export const migrations = [createItemsTable];

export default migrations;
