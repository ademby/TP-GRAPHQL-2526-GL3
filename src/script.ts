// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  console.log("Link: ", await prisma.link.findMany());

  console.log(
    "Link2: ",
    (await prisma.link2.findMany()).map((x) => x.id),
  );
  const newLink = await prisma.link2.create({
    data: {
      url: "www.google.com",
      description: "Most known URL {probably}",
      author: "KB",
    },
  });
  console.log(
    "Link2: ",
    (await prisma.link2.findMany()).map((x) => x.id),
  );
}

// 4
main()
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
