import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // -----------------------
  // ROLES
  // -----------------------
  const roleMap = {
    admin: await prisma.role.create({
      data: { id: "1", name: "admin" },
    }),
    user: await prisma.role.create({
      data: { id: "2", name: "user" },
    }),
  };

  // -----------------------
  // USERS
  // -----------------------
  const user1 = await prisma.user.create({
    data: {
      id: "1",
      username: "aloulou",
      email: "aloulou@insat.ucar.tn",
      roles: {
        connect: [{ id: "1" }],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "2",
      username: "sami",
      email: "sami@insat.ucar.tn",
      roles: {
        connect: [{ id: "2" }],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id: "3",
      username: "bedis",
      email: "bedis@insat.ucar.tn",
      roles: {
        connect: [{ id: "1" }, { id: "2" }],
      },
    },
  });

  // -----------------------
  // SKILLS
  // -----------------------
  await prisma.skill.createMany({
    data: [
      { id: "1", designation: "Devops" },
      { id: "2", designation: "Machine Learning" },
      { id: "3", designation: "Data Science" },
    ],
  });

  // -----------------------
  // CVS
  // -----------------------
  await prisma.cv.create({
    data: {
      id: "1",
      name: "Medius Application",
      age: 22,
      job: "Devops Engineer",

      owner: {
        connect: { id: "1" },
      },

      skills: {
        connect: [{ id: "1" }],
      },
    },
  });

  await prisma.cv.create({
    data: {
      id: "2",
      name: "Sami CV for Summer Internship",
      age: 21,
      job: "Junior MLops Engineer",

      owner: {
        connect: { id: "2" },
      },

      skills: {
        connect: [{ id: "1" }, { id: "2" }],
      },
    },
  });

  await prisma.cv.create({
    data: {
      id: "3",
      name: "CV Final - Exchange Program",
      age: 23,
      job: "Junior Data Scientist",

      owner: {
        connect: { id: "1" },
      },

      skills: {
        connect: [{ id: "2" }, { id: "3" }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
