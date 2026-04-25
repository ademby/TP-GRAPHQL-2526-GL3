import { MutationResolvers, OperationType } from "../generated/graphql";
import { validateCvId, validateCvInput } from "../validators/Cv";

export const Mutation: MutationResolvers = {
  createCv: async (parent, { input }, context, info) => {
    await validateCvInput(input, context.prisma);

    const cv = await context.prisma.cv.create({
      data: {
        name: input.name,
        age: input.age,
        job: input.job,
        owner: { connect: { id: input.ownerId } },
        skills: { connect: input.skillIds.map((id) => ({ id })) },
      },
    });

    context.pubSub.publish("CV_CHANGED", {
      operation: OperationType.Created,
      cv,
    });
    return cv;
  },

  updateCv: async (parent, { id, input }, context, info) => {
    await validateCvId(id, context.prisma);
    await validateCvInput(input, context.prisma);

    const cv = await context.prisma.cv.update({
      where: { id },
      data: {
        name: input.name ?? undefined,
        age: input.age ?? undefined,
        job: input.job ?? undefined,
        owner: input.ownerId ? { connect: { id: input.ownerId } } : undefined,
        skills: input.skillIds
          ? {
              set: input.skillIds
                .filter((skillId): skillId is string => !!skillId)
                .map((skillId) => ({ id: skillId })),
            }
          : undefined,
      },
    });

    context.pubSub.publish("CV_CHANGED", {
      operation: OperationType.Updated,
      cv,
    });
    return cv;
  },

  removeCv: async (parent, { id }, context, info) => {
    await validateCvId(id, context.prisma);

    const cv = await context.prisma.cv.delete({ where: { id } });
    context.pubSub.publish("CV_CHANGED", {
      operation: OperationType.Deleted,
      cv,
    });
    return true;
  },
};
