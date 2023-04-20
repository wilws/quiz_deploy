// ***  This handler provide RESTful API fro external use.
// ***  To direct internal extraction, use function in "src/controller"


import type { NextApiRequest, NextApiResponse } from "next";
import { paramIdSanitiser } from "@/utils/helper";
import { fetchQuiz } from "@/controllers/quiz";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { quizId } = req.query;
  const sanitisedId = paramIdSanitiser(quizId);

  if (sanitisedId == -1) {
    res.status(400).json({ message: "Bad request" });
  }


  switch (req.method) {

    // GET /api/view/:quizId
    case "GET":
      const getResult = await fetchQuiz(sanitisedId);
      res.status(getResult.statusCode).json(getResult?.data);
      break;


    // Others - Not Allowed
    default:
      res.status(405).json("Method not allow");
      break;
  }
}
