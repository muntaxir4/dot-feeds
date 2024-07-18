import { Hono } from "hono";

import { PrismaSingleton } from "../db";
import isAuthenticated from "../auth/authenticated";

const blog = new Hono<{
  Bindings: { JWT_SECRET: string; COOKIE_SECRET: string };
  Variables: { user: { id: number; username: string } };
}>();

blog.post("/create", isAuthenticated, async (c) => {
  const body = await c.req.json();
  const prisma = PrismaSingleton(c);
  const { username } = c.get("user");
  try {
    const { title, content } = body;
    const post = await prisma.blog.create({
      data: {
        title,
        content,
        author: {
          connect: {
            username,
          },
        },
      },
    });
    if (!post) throw "Post creation failed";
    return c.json({ message: "Post created", post }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Post creation failed", error }, 400);
  }
});

blog.get("/:title", async (c) => {
  const prisma = PrismaSingleton(c);
  const title = c.req.param("title");
  try {
    const post = await prisma.blog.findFirst({
      where: {
        title,
      },
    });
    if (!post) throw "Not found";
    return c.json({ post }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error }, 400);
  }
});

export default blog;
