import { NotFoundError } from '../errors/NotFoundError.js';
import { CV_EVENT_TYPES, type CvEventPublisher } from '../ports/CvEventPublisher.js';
import type { Cv } from '../../domain/entities/Cv.js';
import type { CvRepository } from '../../domain/repositories/CvRepository.js';

export class DeleteCvUseCase {
  constructor(
    private readonly cvRepository: CvRepository,
    private readonly eventPublisher: CvEventPublisher,
  ) {}

  async execute(id: string): Promise<Cv> {
    const existingCv = await this.cvRepository.findById(id);

    if (!existingCv) {
      throw new NotFoundError(`Cv with id "${id}" not found.`);
    }

    const deletedCv = await this.cvRepository.deleteById(id);

    if (!deletedCv) {
      throw new NotFoundError(`Cv with id "${id}" not found.`);
    }

    await this.eventPublisher.publish({
      type: CV_EVENT_TYPES.DELETED,
      cv: deletedCv,
    });

    return deletedCv;
  }
}
