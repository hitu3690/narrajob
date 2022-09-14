import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const tags = await prisma.tag.findMany();
  res.json({ tags });
});

router.get("/:id", async (req: Request, res: Response) => {
  const tag = await prisma.tag.findUnique({
    where: { id: parseInt(req.params?.id) },
  });
  res.json({ tag });
});

router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const tag = await prisma.tag.create({
    data: { name },
  });
  res.json({ tag });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name } = req.body;
  const tag = await prisma.tag.upsert({
    where: { id: parseInt(req.params?.id) },
    create: { name },
    update: { name },
  });
  res.json({ tag });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const tag = await prisma.tag.delete({
    where: { id: parseInt(req.params?.id) },
  });
  res.json({ tag });
});

export default router;
