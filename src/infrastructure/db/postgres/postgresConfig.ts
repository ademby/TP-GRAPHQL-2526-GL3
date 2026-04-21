export interface PostgresConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const parsePort = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
};

export const getPostgresConfig = (): PostgresConfig => ({
  host: process.env.DB_HOST ?? process.env.POSTGRES_HOST ?? 'localhost',
  port: parsePort(process.env.DB_PORT ?? process.env.POSTGRES_PORT, 5432),
  user: process.env.DB_USER ?? process.env.POSTGRES_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? process.env.POSTGRES_PASSWORD ?? 'rootpassword',
  database: process.env.DB_NAME ?? process.env.POSTGRES_DB ?? 'cv_database',
});
