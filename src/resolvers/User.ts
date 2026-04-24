import { UserResolvers } from "../generated/graphql";

export const User: UserResolvers = {
  roles: (user, { id }, { db }, info) => {
    return user.roles.map((roleId) =>
      db.roles.find((role) => role.id == roleId),
    );
  },
};
