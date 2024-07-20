import { PrismaClient, withAccelerate } from "@repo/db";
import { Context } from "hono";

//used only to get the type of prismaAccelerate
const prismaAccelerate = new PrismaClient().$extends(withAccelerate());

const db: {
  prisma?: typeof prismaAccelerate;
} = {};

export const PrismaSingleton = () => {
  if (db.prisma) return db.prisma;
  db.prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return db.prisma;
};
