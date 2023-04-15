import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
  if (req.method !== "GET") {
    res.status(500).json({ message: "405 Method Not Allowed"});
  }

  const { quizId } = req.query;

  if (!quizId || isNaN(quizId as any)) return;
  if (!Number(quizId)) return;

  try {
      const quiz = await prisma.user.findUnique({
        where: {
          id: Number(quizId),
        },
        include: {
          question: true,
        },
      });
      res.status(200).json({ quiz });

  } catch (err) {
      res.status(500).json({ message: "Failed to fetch User data" });
  
    } finally {
      await prisma.$disconnect();
  }
  
}
