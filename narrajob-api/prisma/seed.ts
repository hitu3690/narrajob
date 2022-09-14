import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const createArticles = async () => {
    await prisma.article.createMany({
      data: Array(60)
        .fill(0)
        .map((v, i) => ({
          title: "article" + i.toString(),
          img: "article" + i.toString(),
        })),
    });
  };

  const createTags = async () => {
    await prisma.tag.createMany({
      data: Array(60)
        .fill(0)
        .map((v, i) => ({
          name: "tag" + i.toString(),
        })),
    });
  };

  const createTagsOnArticles = async () => {
    const articles = await prisma.article.findMany();
    const tags = await prisma.tag.findMany();

    for (const article of articles) {
      for (const tag of tags) {
        await prisma.tagsOnArticles.create({
          data: {
            articleId: article.id,
            tagId: tag.id,
          },
        });
      }
    }
  };

  await createArticles();
  await createTags();
  await createTagsOnArticles();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
