import { Hono } from "hono";
import { sign } from "hono/jwt";

import { PrismaSingleton } from "../db";
import { setSignedCookie } from "hono/cookie";

const auth = new Hono<{
  Bindings: { JWT_SECRET: string; COOKIE_SECRET: string };
}>();

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
    return c.json({ message: "Signup success", user }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Signup failed", error }, 400);
  }
});

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
    if (!user) throw "User not found";

    const payload = {
      id: user.id.substring(0, 5),
      username: user.username,
    };
    const token = await sign(payload, process.env.JWT_SECRET as string);
    await setSignedCookie(
      c,
      "token",
      token,
      process.env.COOKIE_SECRET as string,
      {
        path: "/",
        secure: true,
        httpOnly: true,
        maxAge: 1000,
      }
    );
    return c.json({ message: "Signin success", user }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Signin failed", error }, 400);
  }
});

export default auth;
