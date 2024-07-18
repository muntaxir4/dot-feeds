import { Hono } from "hono";
import { sign } from "hono/jwt";

import { PrismaSingleton } from "../db";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
} from "hono/cookie";

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
    const token = await sign(payload, c.env.JWT_SECRET);
    console.log("JWTToken", token);

    //not working with signed cookie
    // await setSignedCookie(c, "token", token, c.env.COOKIE_SECRET, {
    //   path: "/",
    //   secure: true,
    //   httpOnly: true,
    //   maxAge: 1000,
    //   expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
    //   sameSite: "None",
    // });

    // const sgCookie = await getSignedCookie(c, "token", c.env.COOKIE_SECRET);

    setCookie(c, "token", token, {
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 1000,
      expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
      sameSite: "None",
    });

    const sgCookie = getCookie(c, "token");

    // console.log("Signed Cookie", sgCookie);
    return c.json({ message: "Signin success", user }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Signin failed", error }, 400);
  }
});

export default auth;
