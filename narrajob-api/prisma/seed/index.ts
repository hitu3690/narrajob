import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.content.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();

  /** shops */
  await prisma.shop.createMany({
    data: Array(200)
      .fill(0)
      .map((v, i) => ({
        name: faker.lorem.sentence(),
        img: faker.image.food(),
        url: faker.internet.domainName(),
        description: faker.lorem.paragraph(),
      })),
  });

  /** products */
  await prisma.product.createMany({
    data: Array(100)
      .fill(0)
      .map((v, i) => ({
        name: faker.word.noun(),
        // N:1
        shopId: 2,
      })),
  });
  const products = await prisma.product.findMany();

  /** users */
  await prisma.user.createMany({
    data: Array(100)
      .fill(0)
      .map((v, i) => ({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        img: faker.image.animals(),
        profile: faker.lorem.paragraph(),
      })),
  });
  const users = await prisma.user.findMany();

  /** articles */
  await prisma.article.createMany({
    data: Array(100)
      .fill(0)
      .map((v, i) => ({
        title: faker.lorem.sentence(),
        img: faker.image.food(),
        // N:1
        authorId: 3,
        productId: 4,
      })),
  });
  const articles = await prisma.article.findMany();

  /** tags */
  await prisma.tag.createMany({
    data: Array(100)
      .fill(0)
      .map((v, i) => ({
        name: faker.lorem.sentence(),
      })),
  });
  const tags = await prisma.tag.findMany();

  /** contents */
  await prisma.content.createMany({
    data: Array(100)
      .fill(0)
      .map((v, i) => ({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        img: faker.image.cats(),
        articleId: 6,
      })),
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
