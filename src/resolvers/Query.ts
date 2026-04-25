import { PrismaClient } from "@prisma/client";
import { QueryResolvers } from "../generated/graphql";

export const Query: QueryResolvers = {
  cv: (parent, { id }, context) =>
    context.prisma.cv.findUnique({ where: { id } }),
  cvs: (parent, {}, context: { prisma: PrismaClient }) =>
    context.prisma.cv.findMany(),
};
