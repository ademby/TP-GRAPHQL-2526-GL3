import type { GraphQLContext } from '../context/GraphQLContext.js';

interface CvByIdArgs {
  id: string;
}

export const queryResolvers = {
  cvs: async (
    _parent: unknown,
    _args: Record<string, never>,
    context: GraphQLContext,
  ) => context.useCases.getAllCvs.execute(),
  cv: async (_parent: unknown, args: CvByIdArgs, context: GraphQLContext) =>
    context.useCases.getCvById.execute(args.id),
};
