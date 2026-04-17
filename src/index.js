import express from 'express';
import cors from 'cors';
import databaseService from './data/database.js';
import routes from './presentation/routes.js';
import { CONFIG } from './core/constants.js';
import runMigrations from '../database/migrations/run.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    code: 'NOT_FOUND'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
});

/**
 * Start the server
 */
export async function startServer() {
  try {
    // Initialize database
    databaseService.connect();
    
    // Run migrations
    await runMigrations();
    
    // Start server only if not in Android mode
    if (!CONFIG.ANDROID_MODE) {
      app.listen(CONFIG.PORT, () => {
        console.log(`Server running on port ${CONFIG.PORT}`);
        console.log(`Health check: http://localhost:${CONFIG.PORT}/health`);
        console.log(`API endpoints: http://localhost:${CONFIG.PORT}/api`);
      });
    }
    
    return app;
  } catch (error) {
    console.error('Failed to start server:', error);
    throw error;
  }
}

// Start server if this is the main module
if (process.argv[1] && process.argv[1].includes('index.js')) {
  startServer();
}

export default app;
