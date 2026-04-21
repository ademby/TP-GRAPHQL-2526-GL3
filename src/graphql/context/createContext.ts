import { PubSub } from 'graphql-subscriptions';
import { AddCvUseCase } from '../../application/use-cases/AddCvUseCase.js';
import { DeleteCvUseCase } from '../../application/use-cases/DeleteCvUseCase.js';
import { GetAllCvsUseCase } from '../../application/use-cases/GetAllCvsUseCase.js';
import { GetCvByIdUseCase } from '../../application/use-cases/GetCvByIdUseCase.js';
import { UpdateCvUseCase } from '../../application/use-cases/UpdateCvUseCase.js';
import { inMemorySeed } from '../../infrastructure/db/seed.js';
import { InMemoryCvRepository } from '../../infrastructure/repositories/InMemoryCvRepository.js';
import { InMemorySkillRepository } from '../../infrastructure/repositories/InMemorySkillRepository.js';
import { InMemoryUserRepository } from '../../infrastructure/repositories/InMemoryUserRepository.js';
import { GraphQLCvEventPublisher } from '../subscriptions/cvEvents.js';
import type { GraphQLContext } from './GraphQLContext.js';

export const createAppContext = (): GraphQLContext => {
  const userRepository = new InMemoryUserRepository(inMemorySeed.users);
  const skillRepository = new InMemorySkillRepository(inMemorySeed.skills);
  const cvRepository = new InMemoryCvRepository(inMemorySeed.cvs);

  const pubSub = new PubSub();
  const eventPublisher = new GraphQLCvEventPublisher(pubSub);

  const getAllCvs = new GetAllCvsUseCase(cvRepository);
  const getCvById = new GetCvByIdUseCase(cvRepository);
  const addCv = new AddCvUseCase(cvRepository, userRepository, skillRepository, eventPublisher);
  const updateCv = new UpdateCvUseCase(
    cvRepository,
    userRepository,
    skillRepository,
    eventPublisher,
  );
  const deleteCv = new DeleteCvUseCase(cvRepository, eventPublisher);

  return {
    repositories: {
      userRepository,
      skillRepository,
      cvRepository,
    },
    useCases: {
      getAllCvs,
      getCvById,
      addCv,
      updateCv,
      deleteCv,
    },
    pubSub,
  };
};
