import { SkillResolvers } from "../generated/graphql";

export const Skill: SkillResolvers = {
  cvs: (parent, args, context, info) =>
    context.prisma.cv.findMany({
      where: {
        skills: {
          some: { id: parent.id },
        },
      },
    }),
};
