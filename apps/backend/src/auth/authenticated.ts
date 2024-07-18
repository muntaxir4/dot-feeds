import { Context, Next } from "hono";

import { getCookie, getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";

async function isAuthenticated(c: Context, next: Next) {
  //   const token = await getSignedCookie(c, "token", c.env.COOKIE_SECRET);
  const token = getCookie(c, "token");
  //   console.log("USER JWT Token", token, getCookie(c, "token"));
  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch (error) {
    console.error(error);
    return c.json({ message: "Unauthorized" }, 401);
  }
}

export default isAuthenticated;
