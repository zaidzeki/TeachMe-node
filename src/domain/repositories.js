/**
 * Item Repository Interface
 */
export class ItemRepository {
  /**
   * Find all items
   * @returns {Promise<Array>}
   */
  async findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Find item by ID
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Create a new item
   * @param {Object} itemData 
   * @returns {Promise<Object>}
   */
  async create(itemData) {
    throw new Error('Method not implemented');
  }

  /**
   * Update an existing item
   * @param {string} id 
   * @param {Object} itemData 
   * @returns {Promise<Object|null>}
   */
  async update(id, itemData) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete an item
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Search items by query
   * @param {string} query 
   * @returns {Promise<Array>}
   */
  async search(query) {
    throw new Error('Method not implemented');
  }

  /**
   * Get favorite items
   * @returns {Promise<Array>}
   */
  async findFavorites() {
    throw new Error('Method not implemented');
  }

  /**
   * Toggle favorite status
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  async toggleFavorite(id) {
    throw new Error('Method not implemented');
  }
}
