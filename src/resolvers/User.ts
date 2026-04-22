export const User = {
  roles: (user, { id }, { db }, info) => {
    return user.roles.map((roleId) =>
      db.roles.find((role) => role.id == roleId),
    );
  },
};
