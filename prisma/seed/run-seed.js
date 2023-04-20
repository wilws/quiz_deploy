const testData = require("../data/test-data/index.js");
// const Prisma = require('@prisma/client');


// import { prisma } from "../../src/db/connection";
// import { testData } from "../data/test-data/index";


// const prisma = new Prisma.PrismaClient();
const prisma = require("../connection.js");

async function createUser(userName) {
  const users = await prisma.user.create({
    data: {
      name: userName,
    },
  });
  return users
}


async function createQuestion(questionObj) {
   const questions = await prisma.question.create({
     data: questionObj,
   });
   return questions;
}



let counter = 0;
let totalQuestion = testData.usersData.length;
const questionsData = [ ... testData.questionsData ]

testData.usersData.forEach((userObj) =>{

  createUser(userObj.name)
  .then(async (users) => {

    counter++;

    // insert 3 questions after the user is created
    for (let i = 0; i < 3; i++) {
        const questionObj = questionsData.shift();
        createQuestion({
          question: questionObj?.question,
          answer: questionObj?.answer,
          creatorId: users.id,
        })
        .catch(async (e) => {
          console.error(e);
          process.exit(1);
        });
    }

  
    if (counter == totalQuestion-1) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `Inserted ${counter} users records into table "user".\nAlso created 3 questions records for each user (total ${
          counter * 3
        } questions records were inserted into table "questions").`
       
      );
      return;

    } else {
      return;
    }
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
});
