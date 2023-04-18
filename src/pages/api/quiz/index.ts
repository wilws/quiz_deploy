import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getFirstUserId, getLastUserId } from "@/utils/db-func";


export default async function quizApiHandler (req: NextApiRequest, res: NextApiResponse) {
  

  // GET /api/quiz
  if (req.method == "GET") {
    const { cursor } = req.query;

    let lastUserId: number | boolean = await getLastUserId();
    if (typeof lastUserId !== "number") {
      res.status(500).json({ message: "Failed to fetch User data" });
      return;
    }

    let _cursor: number = lastUserId;
    let _take: number = 5; // amend this no to change the no of fetch
    let _skip: number = 0;

    const cursorIdFromClient = Number(cursor);
    if (cursorIdFromClient && cursorIdFromClient < lastUserId) {
      _cursor = cursorIdFromClient;
      _skip = 1;
    }

    const prisma = new PrismaClient();

    try {
      const users = await prisma.user.findMany({
        take: _take,
        skip: _skip,
        cursor: {
          id: _cursor,
        },
        include: {
          question: true,
        },
        orderBy: {
          id: "desc",
        },
      });

      const result: Quiz = {
        users,
        count: users.length,
      };

      if (users.length > 0) {
        const lastItemId = users[users.length - 1].id;

        if (lastItemId !== (await getFirstUserId())) {
          result.cursor = lastItemId.toString();
        }
      }


  // setTimeout(() => {
  //   console.log("loading");
  //    res.status(200).json(result);
  // }, 20000);

   res.status(200).json(result);

     

    } catch (err) {
      res.status(500).json({ message: "Failed to fetch User data" });

    } finally {
      await prisma.$disconnect();
    }
  } // End of //GET /api/quiz



  // POST /api/quiz
  if (req.method == "POST") {

    const { creatorName, questions } = req.body;
    const prisma = new PrismaClient();

    try {
      const users = await prisma.user.create({
        data: {
          name: creatorName,
        },
      });

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i].question;
        const answer = questions[i].answer;

        await prisma.question.create({
          data: {
            question,
            answer,
            creatorId: users.id,
          },
        });
      }

      res.status(204);

    } catch (err) {
      res.status(500).json({ message: "Failed to create quiz" });

    } finally {
      await prisma.$disconnect();
    }
  } // End of //POST /api/quiz
}
