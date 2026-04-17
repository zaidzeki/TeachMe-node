import { v4 as uuidv4 } from 'uuid';
import { Item } from '../../domain/entities.js';
import { ItemRepository } from '../../domain/repositories.js';
import databaseService from '../database.js';

/**
 * Item Repository Implementation
 */
export class ItemRepositoryImpl extends ItemRepository {
  constructor() {
    super();
    this.db = null;
  }

  getDb() {
    if (!this.db) {
      this.db = databaseService.getDb();
    }
    return this.db;
  }

  async findAll() {
    const db = this.getDb();
    const stmt = db.prepare('SELECT * FROM items ORDER BY createdAt DESC');
    const rows = stmt.all();
    return rows.map(row => new Item(row).toJSON());
  }

  async findById(id) {
    const db = this.getDb();
    const stmt = db.prepare('SELECT * FROM items WHERE id = ?');
    const row = stmt.get(id);
    return row ? new Item(row).toJSON() : null;
  }

  async create(itemData) {
    const db = this.getDb();
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO items (id, title, description, type, content, isFavorite, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      id,
      itemData.title,
      itemData.description,
      itemData.type,
      JSON.stringify(itemData.content),
      itemData.isFavorite ? 1 : 0,
      now,
      now
    );
    
    return this.findById(id);
  }

  async update(id, itemData) {
    const db = this.getDb();
    const existing = await this.findById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const fields = [];
    const values = [];

    if (itemData.title !== undefined) {
      fields.push('title = ?');
      values.push(itemData.title);
    }
    if (itemData.description !== undefined) {
      fields.push('description = ?');
      values.push(itemData.description);
    }
    if (itemData.type !== undefined) {
      fields.push('type = ?');
      values.push(itemData.type);
    }
    if (itemData.content !== undefined) {
      fields.push('content = ?');
      values.push(JSON.stringify(itemData.content));
    }
    if (itemData.isFavorite !== undefined) {
      fields.push('isFavorite = ?');
      values.push(itemData.isFavorite ? 1 : 0);
    }

    fields.push('updatedAt = ?');
    values.push(now);
    values.push(id);

    const stmt = db.prepare(`UPDATE items SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.findById(id);
  }

  async delete(id) {
    const db = this.getDb();
    const stmt = db.prepare('DELETE FROM items WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  async search(query) {
    const db = this.getDb();
    const searchTerm = `%${query}%`;
    const stmt = db.prepare(`
      SELECT * FROM items 
      WHERE title LIKE ? OR description LIKE ?
      ORDER BY createdAt DESC
    `);
    const rows = stmt.all(searchTerm, searchTerm);
    return rows.map(row => new Item(row).toJSON());
  }

  async findFavorites() {
    const db = this.getDb();
    const stmt = db.prepare('SELECT * FROM items WHERE isFavorite = 1 ORDER BY createdAt DESC');
    const rows = stmt.all();
    return rows.map(row => new Item(row).toJSON());
  }

  async toggleFavorite(id) {
    const db = this.getDb();
    const item = await this.findById(id);
    if (!item) return null;

    const now = new Date().toISOString();
    const stmt = db.prepare(`
      UPDATE items 
      SET isFavorite = ?, updatedAt = ?
      WHERE id = ?
    `);
    stmt.run(item.isFavorite ? 0 : 1, now, id);

    return this.findById(id);
  }
}

export const itemRepository = new ItemRepositoryImpl();
export default itemRepository;
