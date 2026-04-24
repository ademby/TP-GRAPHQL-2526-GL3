import { QueryResolvers } from "../generated/graphql";


export const Query : QueryResolvers = {
  cv: (parent, { id }, context) => {
    return context.db.cvs.find((cv) => cv.id === id) ?? null;
  },
  cvs: (parent, {}, context) => context.db.cvs,
};
