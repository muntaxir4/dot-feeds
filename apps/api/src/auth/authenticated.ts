import { Context, Next } from "hono";

import { getCookie, getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";

async function isAuthenticated(c: Context, next: Next) {
  const token = await getSignedCookie(c, process.env.COOKIE_SECRET, "token");
  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  try {
    const payload = await verify(token, process.env.JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch (error) {
    console.error(error);
    return c.json({ message: "Unauthorized" }, 401);
  }
}

export default isAuthenticated;
