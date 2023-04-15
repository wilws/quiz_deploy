const Prisma = require("@prisma/client");
const prisma = new Prisma.PrismaClient();

async function deleteAllUsers(userName) {
  await prisma.user.deleteMany({});
}

async function deleteAllQuestions(questionObj) {
  await prisma.question.deleteMany({});
}

deleteAllQuestions()
  .then(async () => {
    console.log('\x1b[36m%s\x1b[0m',"All questions in database are deleted.");
    deleteAllUsers()
      .then(async() => {
        await prisma.$disconnect();
        console.log('\x1b[36m%s\x1b[0m',"All users in database are deleted.\n");
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
