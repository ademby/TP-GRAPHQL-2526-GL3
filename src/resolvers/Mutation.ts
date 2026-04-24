import { MutationResolvers } from "../generated/graphql";
import { validateCvInput, validateCvId } from "../validators/Cv";

export const Mutation : MutationResolvers= {
  createCv: (parent, { input }, { db, pubSub }, info) => {
    // validate user and skills
    validateCvInput(input, db);
    // addition
    let { ownerId, skillIds, ...cv } = input;
    cv.id = db.cvs.length + 1;
    cv.owner = ownerId;
    cv.skills = skillIds;
    db.cvs.push(cv);

    pubSub.publish("CV_CHANGED", { operation: "CREATED", cv: cv });
    return cv;
  },
  updateCv: (parent, { id, input }, { db, pubSub }, info) => {
    // validate cvId
    const cvIndex = validateCvId(id, db);
    // validate user and skills
    validateCvInput(input, db);
    // update
    let { ownerId, skillIds, ...cv } = { ...db.cvs[cvIndex], ...input };
    cv.owner = ownerId;
    cv.skills = skillIds;
    db.cvs[cvIndex] = cv;

    pubSub.publish("CV_CHANGED", { operation: "UPDATED", cv: cv });
    return cv;
  },
  removeCv: (parent, { id }, { db, pubSub }, info) => {
    // validate cvId
    const cvIndex = validateCvId(id, db);
    // Implementation for removing CV
    const cv = db.cvs[cvIndex];
    db.cvs.splice(cvIndex, 1);
    pubSub.publish("CV_CHANGED", { operation: "DELETED", cv: cv });
    return true;
  },
};
