import { UserResolvers } from "../generated/graphql";

export const User: UserResolvers = {
  roles: (parent, args, context, info) =>
    context.prisma.role.findMany({
      where: {
        users: {
          some: { id: parent.id },
        },
      },
    }),
  cvs: (parent, args, context, info) =>
    context.prisma.cv.findMany({
      where: { ownerId: parent.id },
    }),
};
