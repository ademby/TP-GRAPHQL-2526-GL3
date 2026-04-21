import { NotFoundError } from '../errors/NotFoundError.js';
import type { Cv } from '../../domain/entities/Cv.js';
import type { CvRepository } from '../../domain/repositories/CvRepository.js';

export class GetCvByIdUseCase {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(id: string): Promise<Cv> {
    const cv = await this.cvRepository.findById(id);

    if (!cv) {
      throw new NotFoundError(`Cv with id "${id}" not found.`);
    }

    return cv;
  }
}
