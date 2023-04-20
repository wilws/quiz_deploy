const prisma = require("../connection.js");


async function testConnection (){
    const connection = await prisma.ConnectionTesting.create({
      data: {
        connection: true,
      },
    });
    return connection;
}

testConnection()
  .then(() => {
    console.log("\x1b[32m%s\x1b[0m", `Connecting to Database`);
  })
  .catch((err) => {
      console.log(err)
    console.log("\x1b[31m%s\x1b[0m", `Fail to connect`);
  });