// ***  This handler provide RESTful API fro external / internal use.


import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAllQuizzes, createQuiz } from "@/controllers/quiz";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  switch (req.method) {


    // GET/ api/quiz
    case "GET":
      const { cursor } = req.query;
      const getResult = await fetchAllQuizzes(cursor);
      res.status(getResult.statusCode).json(getResult.data);
      break;


    // POST/ api/quiz
    case "POST":
      const { creatorName, questions } = req.body;
      const postResult = await createQuiz(creatorName, questions);
      if (postResult && postResult?.statusCode === 204) {
        res.status(204).end();
      } else {
        res.status(500).json({ message: "Failed to create quiz" });
      }
      break;

      
    // Others - Not Allowed
    default:
      res.status(405).json("Method not allow");
      break;
  }
}
