export const Cv = {
  owner: (parent, args, { db }, info) => {
    return db.users.find((user) => user.id === parent.owner);
  },
  skills: (parent, args, { db }, info) => {
    return parent.skills.map((skillId) =>
      db.skills.find((skill) => skill.id === skillId),
    );
  },
};
