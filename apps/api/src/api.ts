import authRoute from "./auth/auth";
import blogRoute from "./blog/blog";
import userRoute from "./user/user";

import { Hono } from "hono";

const api = new Hono();

api.route("/auth", authRoute);
api.route("/blog", blogRoute);
api.route("/u", userRoute);

api.get("/", async (c) => {
  return c.text("Health check success!");
});

export default api;
