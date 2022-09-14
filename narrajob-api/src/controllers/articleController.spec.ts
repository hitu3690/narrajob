import resetDatabase from "../utils/resetDatabase";
import supertest from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("articleController test", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /articles", () => {
    test("response with success", async () => {
      for (let i = 0; i < 3; i++) {
        await prisma.article.create({
          data: { id: i, title: `title${i}`, img: `image${i}` },
        });
      }
      const articles = await prisma.article.findMany();

      const response = await supertest(app).get("/articles");

      expect(response.status).toBe(200);
      // expect(typeof response.body.articles[0].assignedAt).toEqual(typeof articles[0].assignedAt);
      expect(response.body.articles).toEqual(articles);
    });
  });

  describe("GET /articles/:id", () => {
    test("response with success", async () => {
      const article = await prisma.article.create({ data: { id: 1, title: "article1", img: "image1" } });

      const response = await supertest(app).get("/articles/1");
      expect(response.status).toBe(200);
      expect(response.body.article).toEqual(article);
    });
  });

  describe("POST /articles", () => {
    test("response with success", async () => {
      const body = { id: 1, title: "article1", img: "image" };
      const response = await supertest(app).post("/articles").send(body);
      expect(response.status).toBe(200);
      expect(response.body.article).toEqual(body);

      const articles = await prisma.article.findMany();
      expect(articles.length).toBe(1);
    });
  });

  describe("PUT /articles/:id", () => {
    test("response with success", async () => {
      await prisma.article.create({ data: { id: 1, title: "article1", img: "image" } });

      const body = { title: "updated", img: "updated@example.com" };
      const response = await supertest(app).put("/articles/1").send(body);
      expect(response.status).toBe(200);
      expect(response.body.article.title).toEqual(body.title);
      expect(response.body.article.img).toEqual(body.img);

      const after = await prisma.article.findUnique({ where: { id: 1 } });
      expect(after?.title).toEqual(body.title);
      expect(after?.img).toEqual(body.img);
    });
  });

  describe("DELETE /articles/:id", () => {
    test("response with success", async () => {
      const article = await prisma.article.create({ data: { id: 1, title: "article1", img: "image" } });

      const response = await supertest(app).delete("/articles/1");
      expect(response.status).toBe(200);
      expect(response.body.article).toEqual(article);

      const articles = await prisma.article.findMany();
      expect(articles.length).toBe(0);
    });
  });
});
