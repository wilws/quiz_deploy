const testData = require("../data/test-data/index.js");
const prisma = require("../connection.js");

async function createUser(userName) {
  const users = await prisma.creator.create({
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
let questionCounter = 0;
let totalQuestion = testData.usersData.length;
const questionsData = [ ... testData.questionsData ]

testData.usersData.forEach((userObj) =>{

  createUser(userObj.name)
  .then(async (users) => {

    counter++;

    // insert 3 questions after the user is created
    for (let i = 0; i < 3; i++) {
        questionCounter++
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
        `Inserted ${++counter} users records into table "user".\nAlso created 3 questions records for each user (total ${++questionCounter} questions records were inserted into table "questions").`
      );
      return;

    } else {
      return;
    }
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
});
