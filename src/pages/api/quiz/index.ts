import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method == "GET") {
   
        try {
            const users = await prisma.user.findMany();
            res.status(200).json({ users });
        } catch (err) {
            res.status(500).json({ message: "Failed to fetch User data" });
        } finally {
            await prisma.$disconnect();
        }
    }


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
