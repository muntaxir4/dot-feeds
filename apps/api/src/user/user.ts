import { Hono } from "hono";

import { PrismaSingleton } from "../db";

const user = new Hono();

user.get("/:username", async (c) => {
  const prisma = PrismaSingleton(c);
  const username = c.req.param("username");
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        Blogs: true,
      },
    });
    if (!user) throw "Not found";
    return c.json({ user }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error }, 400);
  }
});

export default user;
