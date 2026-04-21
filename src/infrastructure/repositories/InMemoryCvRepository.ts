import type { Cv } from '../../domain/entities/Cv.js';
import type { CvRepository } from '../../domain/repositories/CvRepository.js';

export class InMemoryCvRepository implements CvRepository {
  constructor(private readonly cvs: Cv[]) {}

  async findAll(): Promise<Cv[]> {
    return this.cvs.map((cv) => this.clone(cv));
  }

  async findById(id: string): Promise<Cv | null> {
    const cv = this.cvs.find((item) => item.id === id);
    return cv ? this.clone(cv) : null;
  }

  async create(cv: Cv): Promise<Cv> {
    const toStore = this.clone(cv);
    this.cvs.push(toStore);
    return this.clone(toStore);
  }

  async update(cv: Cv): Promise<Cv | null> {
    const index = this.cvs.findIndex((item) => item.id === cv.id);

    if (index === -1) {
      return null;
    }

    const toStore = this.clone(cv);
    this.cvs[index] = toStore;
    return this.clone(toStore);
  }

  async deleteById(id: string): Promise<Cv | null> {
    const index = this.cvs.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const deleted = this.cvs.splice(index, 1)[0];

    if (!deleted) {
      return null;
    }

    return this.clone(deleted);
  }

  private clone(cv: Cv): Cv {
    return {
      ...cv,
      skillIds: [...cv.skillIds],
    };
  }
}
