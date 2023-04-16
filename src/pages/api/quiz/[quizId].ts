import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quizId } = req.query;

  if (!quizId || isNaN(quizId as any) || Number(quizId) < 0) {
    res.status(400).json({ message: "Bad request" });
  }

  // GET /api/quiz/:quizId
  if (req.method == "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(quizId),
        },
        include: {
          question: true,
        },
      });
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch User data" });
    } finally {
      await prisma.$disconnect();
    }
  }

  // DELETE /api/quiz/:quizId
  if (req.method == "DELETE") {
    res.status(404).json({ message: "Not found" });
  }

  // PUT /api/quiz/:quizId
  if (req.method == "PUT") {
    res.status(404).json({ message: "Not found" });
  }

  // PATCH /api/quiz/:quizId
  if (req.method == "PATCH") {
    res.status(404).json({ message: "Not found" });
  }
}
