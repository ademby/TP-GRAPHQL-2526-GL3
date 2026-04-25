import { GraphQLError } from "graphql";
import { PrismaClient, Cv } from "@prisma/client";
import { CreateCvInput, UpdateCvInput } from "../generated/graphql";

export async function validateCvInput(
  input: CreateCvInput | UpdateCvInput,
  prisma: PrismaClient,
) {
  if (input.ownerId) {
    const owner = await prisma.user.findUnique({
      where: { id: input.ownerId },
      select: { id: true },
    });
    if (!owner) {
      throw new GraphQLError(`User with ID ${input.ownerId} not found`);
    }
  }

  if (input.skillIds) {
    const normalizedSkillIds = input.skillIds.filter(
      (skillId): skillId is string => !!skillId,
    );
    const skills = await prisma.skill.findMany({
      where: { id: { in: normalizedSkillIds } },
      select: { id: true },
    });
    if (skills.length !== normalizedSkillIds.length) {
      throw new GraphQLError(`One or more referenced skills are not found`);
    }
  }
}

export async function validateCvId(
  id: string,
  prisma: PrismaClient,
): Promise<Cv> {
  const cv = await prisma.cv.findUnique({ where: { id } });
  if (!cv) {
    throw new GraphQLError(`CV with ID ${id} not found`);
  }
  return cv;
}
