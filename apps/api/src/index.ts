import dotenv from "dotenv";
dotenv.config();

import { serve } from "@hono/node-server";
import { Hono } from "hono";

import apiRoute from "./api";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Welcome to Dot Feeds API!");
});

app.route("/api/v1", apiRoute);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
