import { Hono } from "hono";

import { PrismaSingleton } from "../db";
import isAuthenticated from "../auth/authenticated";

const user = new Hono<{
  Variables: { user: { id: string; username: string } };
}>();

user.get("/check", isAuthenticated, async (c) => {
  const prisma = PrismaSingleton();
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: c.get("user").username,
      },
      select: {
        email: true,
        username: true,
      },
    });
    if (!user) throw "Not found";

    return c.json({ message: "Authenticated", user }, 200);
  } catch (error) {
    return c.json({ error }, 400);
  }
});

user.get("/:username", async (c) => {
  const prisma = PrismaSingleton();
  const username = c.req.param("username");
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
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
