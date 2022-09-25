import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allArticles = await prisma.article.findMany({
    where: { id: 6 },
    include: {
      contents: true,
    },
  });
  const allTags = await prisma.tag.findMany();
  console.log({ allArticles, allTags });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
