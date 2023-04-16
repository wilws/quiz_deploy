import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const getFirstUserId = async (): Promise<number | boolean> => {

  try {

    const firstUserObj = await prisma.user.findFirst();
    if (!firstUserObj) throw new Error("cannot Set cursor");

    return firstUserObj.id;
   
   } catch(err) {
    return false;

   } finally {

    await prisma.$disconnect();
   }
}



export default async function quizApiHandler (req: NextApiRequest, res: NextApiResponse) {
 
  // GET /api/quiz
  if (req.method == "GET") {
    const { cursor } = req.query;

    let _take:number = 2; // amend this no to change the no of fetch
    let _skip:number = 0;

    let firstUserId:number|boolean = await getFirstUserId();
    if (typeof firstUserId !== "number") {
      res.status(500).json({ message: "Failed to fetch User data" });
      await prisma.$disconnect();
      return;
    }

    let _cursor:number = firstUserId;

    const cursorIdFromClient = Number(cursor);
    if (cursorIdFromClient && cursorIdFromClient > firstUserId) {
      _cursor = cursorIdFromClient;
      _skip = 1;
    }

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
      });

      const result = {
        users,
        count: users.length,
        cursor: "",
      };

      if (users.length > 0) {
        const lastItemId = users[users.length - 1].id;
        result.cursor = lastItemId.toString();
        // result.nextPages = `${req.headers.host}/api/quiz?cursor=${lastItemId}`;
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch User data" });
    } finally {
      await prisma.$disconnect();
    }
  }

  // POST /api/quiz
  if (req.method == "POST") {
    const { name, questions, answers } = req.body;

    try {
      const users = await prisma.user.create({
        data: {
          name: name,
        },
      });

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answer = answers[i];

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
  }
}
