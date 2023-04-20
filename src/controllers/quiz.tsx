
import { getFirstUserId, getLastUserId } from "@/utils/db-func";
import { prisma } from "../db/connection";
import { paramIdSanitiser } from "@/utils/helper";

type resultType = {
  statusCode: number;
  data: NonNullable<any>;
};

export async function fetchAllQuizzes(cursor: any):Promise<resultType> {
  let lastUserId: number | boolean = await getLastUserId();

  if (typeof lastUserId !== "number") {
    return {
      statusCode: 200,
      data: { message: "No User" },
    };
  }

  let _cursor: number = lastUserId;
  let _take: number = 13; // amend this no to change the no of fetch
  let _skip: number = 0;

  const cursorIdFromClient = Number(cursor);
  if (cursorIdFromClient && cursorIdFromClient < lastUserId) {
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

    return {
      statusCode: 200,
      data: result,
    };
  } catch (err) {
    return {
      statusCode: 500,
      data: { message: "Failed to fetch User data" },
    };
  }
}



export async function fetchQuiz(quizId:number):Promise<resultType> {
  
    try {
        const user = await prisma.user.findUnique({
            where: {
            id: paramIdSanitiser(quizId),
            },
            include: {
            question: true,
            },
        });

        return {
            statusCode: 200,
            data: user,
        };

    } catch (err) {

        return {
            statusCode: 500,
            data: { message: "Failed to fetch User data" },
        };
    }
}


export async function createQuiz(creatorName:any, questions:any):Promise<resultType> {
  
      
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

        return {
            statusCode: 204,
            data: { message: "Quiz Created" },
        };

  } catch (err) {

    return {
        statusCode: 500,
        data: { message: "Failed to create quiz" },
    };
    
  }
}