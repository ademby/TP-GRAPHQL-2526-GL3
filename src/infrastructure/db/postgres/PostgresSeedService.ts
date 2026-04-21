import type { Pool, PoolClient } from 'pg';
import { inMemorySeed } from '../seed.js';

export class PostgresSeedService {
  constructor(private readonly pool: Pool) {}

  async seedDatabase(): Promise<void> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      await this.resetSchema(client);
      await this.insertUsers(client);
      await this.insertSkills(client);
      await this.insertCvs(client);
      await this.insertCvSkills(client);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  private async resetSchema(client: PoolClient): Promise<void> {
    await client.query(`
      DROP TABLE IF EXISTS cv_skills;
      DROP TABLE IF EXISTS cvs;
      DROP TABLE IF EXISTS skills;
      DROP TABLE IF EXISTS users;

      CREATE TABLE users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL CHECK (role IN ('USER', 'ADMIN'))
      );

      CREATE TABLE skills (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE cvs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE cv_skills (
        cv_id TEXT NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
        skill_id TEXT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
        PRIMARY KEY (cv_id, skill_id)
      );
    `);
  }

  private async insertUsers(client: PoolClient): Promise<void> {
    for (const user of inMemorySeed.users) {
      await client.query(
        `
          INSERT INTO users (id, name, email, role)
          VALUES ($1, $2, $3, $4)
        `,
        [user.id, user.name, user.email, user.role],
      );
    }
  }

  private async insertSkills(client: PoolClient): Promise<void> {
    for (const skill of inMemorySeed.skills) {
      await client.query(
        `
          INSERT INTO skills (id, name)
          VALUES ($1, $2)
        `,
        [skill.id, skill.name],
      );
    }
  }

  private async insertCvs(client: PoolClient): Promise<void> {
    for (const cv of inMemorySeed.cvs) {
      await client.query(
        `
          INSERT INTO cvs (id, title, description, user_id)
          VALUES ($1, $2, $3, $4)
        `,
        [cv.id, cv.title, cv.description, cv.userId],
      );
    }
  }

  private async insertCvSkills(client: PoolClient): Promise<void> {
    for (const cv of inMemorySeed.cvs) {
      const uniqueSkillIds = [...new Set(cv.skillIds)];

      for (const skillId of uniqueSkillIds) {
        await client.query(
          `
            INSERT INTO cv_skills (cv_id, skill_id)
            VALUES ($1, $2)
          `,
          [cv.id, skillId],
        );
      }
    }
  }
}
