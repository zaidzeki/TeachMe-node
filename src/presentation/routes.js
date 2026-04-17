import express from 'express';
import { itemRepository } from '../data/repositories/item-repository.js';
import { successResponse, errorResponse } from '../core/constants.js';

const router = express.Router();

/**
 * GET /api/items
 * Get all items
 */
router.get('/items', async (req, res) => {
  try {
    const items = await itemRepository.findAll();
    res.json(successResponse(items));
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json(errorResponse('Failed to fetch items'));
  }
});

/**
 * GET /api/items/:id
 * Get item by ID
 */
router.get('/items/:id', async (req, res) => {
  try {
    const item = await itemRepository.findById(req.params.id);
    if (!item) {
      return res.status(404).json(errorResponse('Item not found', 'NOT_FOUND'));
    }
    res.json(successResponse(item));
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json(errorResponse('Failed to fetch item'));
  }
});

/**
 * POST /api/items
 * Create a new item
 */
router.post('/items', async (req, res) => {
  try {
    const { title, description, type, content, isFavorite } = req.body;
    
    if (!title || !type) {
      return res.status(400).json(errorResponse('Title and type are required', 'VALIDATION_ERROR'));
    }
    
    const item = await itemRepository.create({
      title,
      description,
      type,
      content,
      isFavorite
    });
    
    res.status(201).json(successResponse(item, 'Item created successfully'));
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json(errorResponse('Failed to create item'));
  }
});

/**
 * PUT /api/items/:id
 * Update an existing item
 */
router.put('/items/:id', async (req, res) => {
  try {
    const item = await itemRepository.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).json(errorResponse('Item not found', 'NOT_FOUND'));
    }
    res.json(successResponse(item, 'Item updated successfully'));
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json(errorResponse('Failed to update item'));
  }
});

/**
 * DELETE /api/items/:id
 * Delete an item
 */
router.delete('/items/:id', async (req, res) => {
  try {
    const deleted = await itemRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json(errorResponse('Item not found', 'NOT_FOUND'));
    }
    res.json(successResponse(null, 'Item deleted successfully'));
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json(errorResponse('Failed to delete item'));
  }
});

/**
 * GET /api/items/search?q=query
 * Search items
 */
router.get('/items/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json(errorResponse('Search query is required', 'VALIDATION_ERROR'));
    }
    
    const items = await itemRepository.search(q);
    res.json(successResponse(items));
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json(errorResponse('Failed to search items'));
  }
});

/**
 * GET /api/items/favorites
 * Get favorite items
 */
router.get('/items/favorites', async (req, res) => {
  try {
    const items = await itemRepository.findFavorites();
    res.json(successResponse(items));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json(errorResponse('Failed to fetch favorites'));
  }
});

/**
 * POST /api/items/:id/toggle-favorite
 * Toggle favorite status
 */
router.post('/items/:id/toggle-favorite', async (req, res) => {
  try {
    const item = await itemRepository.toggleFavorite(req.params.id);
    if (!item) {
      return res.status(404).json(errorResponse('Item not found', 'NOT_FOUND'));
    }
    res.json(successResponse(item, 'Favorite status updated'));
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json(errorResponse('Failed to toggle favorite'));
  }
});

export default router;
