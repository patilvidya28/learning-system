import { pool, query } from '../config/database';

const resetDatabase = async (): Promise<void> => {
  try {
    console.log('🗑️  Dropping all tables...\n');
    
    // Drop tables in reverse order (respecting foreign keys)
    await query('DROP TABLE IF EXISTS refresh_tokens CASCADE');
    await query('DROP TABLE IF EXISTS video_progress CASCADE');
    await query('DROP TABLE IF EXISTS enrollments CASCADE');
    await query('DROP TABLE IF EXISTS videos CASCADE');
    await query('DROP TABLE IF EXISTS sections CASCADE');
    await query('DROP TABLE IF EXISTS subjects CASCADE');
    await query('DROP TABLE IF EXISTS users CASCADE');
    await query('DROP TABLE IF EXISTS migrations CASCADE');
    
    console.log('✓ All tables dropped\n');
    
    console.log('Re-running migrations...\n');
    await pool.end();
    
    // Run migrations by importing the script
    const { exec } = require('child_process');
    exec('npm run migrate', (error: any, stdout: string, stderr: string) => {
      if (error) {
        console.error('Migration failed:', error);
        process.exit(1);
      }
      console.log(stdout);
      console.log('\n✅ Database reset complete!');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('\n❌ Database reset failed:', error);
    process.exit(1);
  }
};

resetDatabase();
