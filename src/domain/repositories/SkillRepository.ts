import type { Skill } from '../entities/Skill.js';

export interface SkillRepository {
  findById(id: string): Promise<Skill | null>;
  findByIds(ids: string[]): Promise<Skill[]>;
}
