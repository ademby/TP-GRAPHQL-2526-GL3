import { randomUUID } from 'node:crypto';
import { NotFoundError } from '../errors/NotFoundError.js';
import { CV_EVENT_TYPES, type CvEventPublisher } from '../ports/CvEventPublisher.js';
import type { Cv } from '../../domain/entities/Cv.js';
import type { CvRepository } from '../../domain/repositories/CvRepository.js';
import type { SkillRepository } from '../../domain/repositories/SkillRepository.js';
import type { UserRepository } from '../../domain/repositories/UserRepository.js';

export interface AddCvInput {
  title: string;
  description: string;
  userId: string;
  skillIds: string[];
}

export class AddCvUseCase {
  constructor(
    private readonly cvRepository: CvRepository,
    private readonly userRepository: UserRepository,
    private readonly skillRepository: SkillRepository,
    private readonly eventPublisher: CvEventPublisher,
  ) {}

  async execute(input: AddCvInput): Promise<Cv> {
    const user = await this.userRepository.findById(input.userId);

    if (!user) {
      throw new NotFoundError(`User with id "${input.userId}" not found.`);
    }

    const uniqueSkillIds = [...new Set(input.skillIds)];
    const skills = await this.skillRepository.findByIds(uniqueSkillIds);

    if (skills.length !== uniqueSkillIds.length) {
      const existingSkillIds = new Set(skills.map((skill) => skill.id));
      const missingSkillIds = uniqueSkillIds.filter((id) => !existingSkillIds.has(id));

      throw new NotFoundError(`Skill(s) not found: ${missingSkillIds.join(', ')}`);
    }

    const cv: Cv = {
      id: randomUUID(),
      title: input.title,
      description: input.description,
      userId: input.userId,
      skillIds: uniqueSkillIds,
    };

    const createdCv = await this.cvRepository.create(cv);

    await this.eventPublisher.publish({
      type: CV_EVENT_TYPES.ADDED,
      cv: createdCv,
    });

    return createdCv;
  }
}
