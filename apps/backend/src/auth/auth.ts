import { Hono } from "hono";
import { env } from "hono/adapter";

import { PrismaSingleton } from "../db";

const auth = new Hono();

auth.post("/signin", async (c) => {
  const body = await c.req.json();
  const prisma = PrismaSingleton(c);
  try {
    const { email, password } = body;
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    return c.json({ message: "Signin", user });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Signin failed", error });
  }
});

auth.post("/signup", async (c) => {
  const body = await c.req.json();
  const prisma = PrismaSingleton(c);
  try {
    const { email, password, username } = body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });
    return c.json({ message: "Signup success", user });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Signup failed", error });
  }
});

export default auth;
