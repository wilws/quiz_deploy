import { PrismaClient } from "@prisma/client";


export const getFirstUserId = async (): Promise<number | boolean> => {
    const prisma = new PrismaClient();
    try {
        const firstUserObj = await prisma.user.findFirst();
        if (!firstUserObj) throw new Error("cannot Set cursor");
        return firstUserObj.id;
    } catch (err) {
        return false;
    } finally {
        await prisma.$disconnect();
    };
};

export const getLastUserId = async (): Promise<number | boolean> => {
    const prisma = new PrismaClient();
    try {
        const lastUserObj = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            take: 1,
        });
        if (!lastUserObj) throw new Error("cannot Set cursor");
        return lastUserObj[0].id;
    } catch (err) {
        return false;
    } finally {
        await prisma.$disconnect();
    };
};
