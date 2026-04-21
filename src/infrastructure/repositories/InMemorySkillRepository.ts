import type { Skill } from '../../domain/entities/Skill.js';
import type { SkillRepository } from '../../domain/repositories/SkillRepository.js';

export class InMemorySkillRepository implements SkillRepository {
  constructor(private readonly skills: Skill[]) {}

  async findById(id: string): Promise<Skill | null> {
    const skill = this.skills.find((item) => item.id === id);
    return skill ? { ...skill } : null;
  }

  async findByIds(ids: string[]): Promise<Skill[]> {
    const skillsById = new Map(this.skills.map((skill) => [skill.id, skill]));
    const resolvedSkills: Skill[] = [];

    for (const id of ids) {
      const skill = skillsById.get(id);

      if (skill) {
        resolvedSkills.push({ ...skill });
      }
    }

    return resolvedSkills;
  }
}
