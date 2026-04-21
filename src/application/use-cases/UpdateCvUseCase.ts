import { NotFoundError } from '../errors/NotFoundError.js';
import { CV_EVENT_TYPES, type CvEventPublisher } from '../ports/CvEventPublisher.js';
import type { Cv } from '../../domain/entities/Cv.js';
import type { CvRepository } from '../../domain/repositories/CvRepository.js';
import type { SkillRepository } from '../../domain/repositories/SkillRepository.js';
import type { UserRepository } from '../../domain/repositories/UserRepository.js';

export interface UpdateCvInput {
  id: string;
  title?: string;
  description?: string;
  userId?: string;
  skillIds?: string[];
}

export class UpdateCvUseCase {
  constructor(
    private readonly cvRepository: CvRepository,
    private readonly userRepository: UserRepository,
    private readonly skillRepository: SkillRepository,
    private readonly eventPublisher: CvEventPublisher,
  ) {}

  async execute(input: UpdateCvInput): Promise<Cv> {
    const existingCv = await this.cvRepository.findById(input.id);

    if (!existingCv) {
      throw new NotFoundError(`Cv with id "${input.id}" not found.`);
    }

    const targetUserId = input.userId ?? existingCv.userId;
    const targetSkillIds = input.skillIds ? [...new Set(input.skillIds)] : existingCv.skillIds;

    if (input.userId) {
      const user = await this.userRepository.findById(targetUserId);

      if (!user) {
        throw new NotFoundError(`User with id "${targetUserId}" not found.`);
      }
    }

    if (input.skillIds) {
      const skills = await this.skillRepository.findByIds(targetSkillIds);

      if (skills.length !== targetSkillIds.length) {
        const existingSkillIds = new Set(skills.map((skill) => skill.id));
        const missingSkillIds = targetSkillIds.filter((id) => !existingSkillIds.has(id));

        throw new NotFoundError(`Skill(s) not found: ${missingSkillIds.join(', ')}`);
      }
    }

    const updatedCv: Cv = {
      ...existingCv,
      title: input.title ?? existingCv.title,
      description: input.description ?? existingCv.description,
      userId: targetUserId,
      skillIds: targetSkillIds,
    };

    const savedCv = await this.cvRepository.update(updatedCv);

    if (!savedCv) {
      throw new NotFoundError(`Cv with id "${input.id}" not found.`);
    }

    await this.eventPublisher.publish({
      type: CV_EVENT_TYPES.UPDATED,
      cv: savedCv,
    });

    return savedCv;
  }
}
