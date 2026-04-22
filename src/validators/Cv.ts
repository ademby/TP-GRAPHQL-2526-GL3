import { GraphQLError } from "graphql";

export function validateCvInput(input: any, db: any) {
  if (
    input.ownerId &&
    db.users.find((user) => user.id === input.ownerId) === undefined
  ) {
    throw new GraphQLError(`User with ID ${input.ownerId} not found`);
  }
  if (
    input.skillIds &&
    input.skillIds.some(
      (skillId) =>
        db.skills.find((skill) => skill.id === skillId) === undefined,
    )
  ) {
    throw new GraphQLError(`One or more referenced skills are not found`);
  }
}

export function validateCvId(id: number, db: any) {
  let cvIndex = db.cvs.findIndex((cv) => cv.id === id);
  if (cvIndex === -1) {
    throw new GraphQLError(`CV with ID ${id} not found`);
  }
  return cvIndex;
}
