/**
 * Core utilities and constants for TeachMe Node.js app
 */

// App configuration
export const CONFIG = {
  PORT: process.env.PORT || 3000,
  DB_PATH: process.env.DB_PATH || './data/teachme.db',
  ANDROID_MODE: process.env.ANDROID_MODE === 'true'
};

// API response helpers
export const successResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

export const errorResponse = (message, code = 'ERROR') => ({
  success: false,
  message,
  code
});

// Common constants
export const ITEM_TYPES = {
  LESSON: 'lesson',
  QUIZ: 'quiz',
  ARTICLE: 'article',
  VIDEO: 'video'
};

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  ALPHABETICAL: 'alphabetical',
  POPULAR: 'popular'
};
