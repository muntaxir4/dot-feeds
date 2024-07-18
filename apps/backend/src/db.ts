import { PrismaClient, withAccelerate } from "@repo/db";
import { Context } from "hono";

//used only to get the type of prismaAccelerate
const prismaAccelerate = new PrismaClient().$extends(withAccelerate());

const db: {
  prisma?: typeof prismaAccelerate;
} = {};

export const PrismaSingleton = (c: Context) => {
  if (db.prisma) return db.prisma;
  db.prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return db.prisma;
};
