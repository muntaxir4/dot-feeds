import { Context, Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcrypt";

import { PrismaSingleton } from "../db";
import { setSignedCookie } from "hono/cookie";

const auth = new Hono<{
  Bindings: { JWT_SECRET: string; COOKIE_SECRET: string };
}>();

//this is called in both signup and signin
async function setJwtAndCookie(c: Context, userId: string, username: string) {
  const payload = {
    id: userId.substring(0, 5),
    username,
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
}

auth.post("/signup", async (c) => {
  const body = await c.req.json();
  const prisma = PrismaSingleton(c);
  try {
    const { email, password, username } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    await setJwtAndCookie(c, user.id, user.username);
    return c.json({ message: "Signup success", user }, 200);
  } catch (error) {
    console.error(error);
    if (error?.code === "P2002")
      return c.json({ message: "Email exists already", error }, 400);
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
      },
    });
    if (!user) throw "User not found";

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw "Invalid password";

    await setJwtAndCookie(c, user.id, user.username);
    return c.json({ message: "Signin success", user }, 200);
  } catch (error) {
    console.error(error);

    return c.json({ message: "Signin failed", error }, 400);
  }
});

export default auth;
