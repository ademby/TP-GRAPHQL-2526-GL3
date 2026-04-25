import { CvResolvers } from "../generated/graphql";

export const Cv: CvResolvers = {
  owner: (parent, args, context, info) =>
    context.prisma.user.findUnique({ where: { id: parent.ownerId } }),
  skills: (parent, args, context, info) =>
    context.prisma.skill.findMany({
      where: {
        cvs: {
          some: { id: parent.id },
        },
      },
    }),
};
