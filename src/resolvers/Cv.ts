import { CvResolvers } from "../generated/graphql";

export const Cv : CvResolvers= {
  owner: (parent, args, { db }, info) => {
    return db.users.find((user) => user.id === parent.owner);
  },
  skills: (parent, args, { db }, info) => {
    return parent.skills.map((skillId) =>
      db.skills.find((skill) => skill.id === skillId),
    );
  },
};
