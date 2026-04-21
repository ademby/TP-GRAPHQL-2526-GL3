import { NotFoundError } from '../../application/errors/NotFoundError.js';
import type { Cv } from '../../domain/entities/Cv.js';
import type { GraphQLContext } from '../context/GraphQLContext.js';

export const cvResolvers = {
  user: async (cv: Cv, _args: Record<string, never>, context: GraphQLContext) => {
    const user = await context.repositories.userRepository.findById(cv.userId);

    if (!user) {
      throw new NotFoundError(`User with id "${cv.userId}" not found.`);
    }

    return user;
  },
  skills: async (cv: Cv, _args: Record<string, never>, context: GraphQLContext) =>
    context.repositories.skillRepository.findByIds(cv.skillIds),
};
