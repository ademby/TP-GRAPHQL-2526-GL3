import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.cv.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.skill.deleteMany();
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
