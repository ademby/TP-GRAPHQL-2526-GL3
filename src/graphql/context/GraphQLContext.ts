import type { PubSub } from 'graphql-subscriptions';
import type { AddCvUseCase } from '../../application/use-cases/AddCvUseCase.js';
import type { DeleteCvUseCase } from '../../application/use-cases/DeleteCvUseCase.js';
import type { GetAllCvsUseCase } from '../../application/use-cases/GetAllCvsUseCase.js';
import type { GetCvByIdUseCase } from '../../application/use-cases/GetCvByIdUseCase.js';
import type { UpdateCvUseCase } from '../../application/use-cases/UpdateCvUseCase.js';
import type { CvRepository } from '../../domain/repositories/CvRepository.js';
import type { SkillRepository } from '../../domain/repositories/SkillRepository.js';
import type { UserRepository } from '../../domain/repositories/UserRepository.js';

export interface GraphQLContext {
  repositories: {
    userRepository: UserRepository;
    skillRepository: SkillRepository;
    cvRepository: CvRepository;
  };
  useCases: {
    getAllCvs: GetAllCvsUseCase;
    getCvById: GetCvByIdUseCase;
    addCv: AddCvUseCase;
    updateCv: UpdateCvUseCase;
    deleteCv: DeleteCvUseCase;
  };
  pubSub: PubSub;
}
