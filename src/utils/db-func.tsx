import { PrismaClient } from "@prisma/client";
import { prisma } from "@/db/connection";



export const getFirstUserId = async (): Promise<number | boolean> => {

    // const prisma = new PrismaClient();
  
    try {
        const firstUserObj = await prisma.creator.findFirst();
        if (!firstUserObj) throw new Error("cannot Set cursor");
        return firstUserObj.id;
    } catch (err) {
        return false;
    } 
};

export const getLastUserId = async (): Promise<number | boolean> => {

    //  const prisma = new PrismaClient();
 
    try {
        const lastUserObj = await prisma.creator.findMany({
          orderBy: { id: "desc" },
          take: 1,
        });

        if (!lastUserObj) throw new Error("cannot Set cursor");
        return lastUserObj[0].id;
        
    } catch (err) {
        return false;
    } 
};

export const getTotalUserNo = async (): Promise<number | boolean> => {

    //  const prisma = new PrismaClient();
  
  try {
    const creators = await prisma.creator.findMany();

    if (!creators) throw new Error("cannot Set cursor");
    
    return creators.length
  } catch (err) {
    return false;
  }
};