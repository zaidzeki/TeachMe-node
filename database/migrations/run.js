import databaseService from '../../src/data/database.js';
import { migrations } from './001_create_items_table.js';

/**
 * Run all pending migrations
 */
async function runMigrations() {
  try {
    console.log('Starting migrations...');
    
    // Connect to database
    databaseService.connect();
    
    // Run migrations
    databaseService.runMigrations(migrations);
    
    console.log('All migrations completed successfully!');
    
    // Disconnect
    databaseService.disconnect();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (process.argv[1] && process.argv[1].includes('run.js')) {
  runMigrations();
}

export default runMigrations;
