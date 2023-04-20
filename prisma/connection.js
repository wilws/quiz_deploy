const Prisma = require("@prisma/client");

const globalForPrisma = global 

const prisma =
  globalForPrisma.prisma ??
  new Prisma.PrismaClient({log:['query']});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

module.exports = prisma