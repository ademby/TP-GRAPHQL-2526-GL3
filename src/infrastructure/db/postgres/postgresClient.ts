import { Pool } from 'pg';
import { getPostgresConfig } from './postgresConfig.js';

export const createPostgresPool = (): Pool => {
  const config = getPostgresConfig();

  return new Pool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });
};
