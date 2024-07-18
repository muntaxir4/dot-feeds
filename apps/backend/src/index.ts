import { Hono } from "hono";

import apiRoute from "./api";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1", apiRoute);

export default app;
