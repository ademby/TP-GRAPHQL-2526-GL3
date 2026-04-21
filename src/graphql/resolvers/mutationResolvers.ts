import type { AddCvInput } from '../../application/use-cases/AddCvUseCase.js';
import type { UpdateCvInput } from '../../application/use-cases/UpdateCvUseCase.js';
import type { GraphQLContext } from '../context/GraphQLContext.js';

interface AddCvArgs {
  input: AddCvInput;
}

interface UpdateCvArgs {
  input: UpdateCvInput;
}

interface DeleteCvArgs {
  id: string;
}

export const mutationResolvers = {
  addCv: async (_parent: unknown, args: AddCvArgs, context: GraphQLContext) =>
    context.useCases.addCv.execute(args.input),
  updateCv: async (_parent: unknown, args: UpdateCvArgs, context: GraphQLContext) =>
    context.useCases.updateCv.execute(args.input),
  deleteCv: async (_parent: unknown, args: DeleteCvArgs, context: GraphQLContext) =>
    context.useCases.deleteCv.execute(args.id),
};
