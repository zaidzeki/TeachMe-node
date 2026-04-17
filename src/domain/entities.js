/**
 * Item Entity
 */
export class Item {
  constructor({ id, title, description, type, content, isFavorite, createdAt, updatedAt }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type; // lesson, quiz, article, video
    this.content = content;
    this.isFavorite = isFavorite || false;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      type: this.type,
      content: this.content,
      isFavorite: this.isFavorite,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

/**
 * User Entity (for future auth)
 */
export class User {
  constructor({ id, name, email, preferences, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.preferences = preferences || { theme: 'light' };
    this.createdAt = createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      preferences: this.preferences,
      createdAt: this.createdAt
    };
  }
}
