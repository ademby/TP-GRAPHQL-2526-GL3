import type { Cv } from '../../domain/entities/Cv.js';
import type { CvRepository } from '../../domain/repositories/CvRepository.js';

export class GetAllCvsUseCase {
  constructor(private readonly cvRepository: CvRepository) {}

  async execute(): Promise<Cv[]> {
    return this.cvRepository.findAll();
  }
}
