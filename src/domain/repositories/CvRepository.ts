import type { Cv } from '../entities/Cv.js';

export interface CvRepository {
  findAll(): Promise<Cv[]>;
  findById(id: string): Promise<Cv | null>;
  create(cv: Cv): Promise<Cv>;
  update(cv: Cv): Promise<Cv | null>;
  deleteById(id: string): Promise<Cv | null>;
}
