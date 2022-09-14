import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const articles = await prisma.article.findMany();
  res.json({ articles });
});

router.get("/:id", async (req: Request, res: Response) => {
  const article = await prisma.article.findUnique({
    where: { id: parseInt(req.params?.id) },
  });
  res.json({ article });
});

router.post("/", async (req: Request, res: Response) => {
  const { title, img } = req.body;
  const article = await prisma.article.create({
    data: { title, img },
  });
  res.json({ article });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { title, img } = req.body;
  const article = await prisma.article.upsert({
    where: { id: parseInt(req.params?.id) },
    create: { title, img },
    update: { title, img },
  });
  res.json({ article });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const article = await prisma.article.delete({
    where: { id: parseInt(req.params?.id) },
  });
  res.json({ article });
});

export default router;
