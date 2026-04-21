import { createPostgresPool } from '../infrastructure/db/postgres/postgresClient.js';
import { PostgresSeedService } from '../infrastructure/db/postgres/PostgresSeedService.js';

const runSeed = async (): Promise<void> => {
  const pool = createPostgresPool();
  const seedService = new PostgresSeedService(pool);

  try {
    console.log('Reinitialisation de la base et insertion des donnees...');
    await seedService.seedDatabase();
    console.log('Base reinitialisee et remplie avec succes.');
  } catch (error) {
    console.error('Echec du seed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

void runSeed();
