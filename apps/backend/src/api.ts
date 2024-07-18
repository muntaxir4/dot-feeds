import authRoute from "./auth/auth";

import { Hono } from "hono";

const api = new Hono();

api.route("/auth", authRoute);

api.get("/", (c) => {
  return c.text("Health check success!");
});

export default api;
