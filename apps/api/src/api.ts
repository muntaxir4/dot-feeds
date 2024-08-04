import authRoute from "./auth/auth";
import blogRoute from "./blog/blog";
import userRoute from "./user/user";
import uploadRoute from "./upload/upload";

import { Hono } from "hono";
import { cors } from "hono/cors";

const api = new Hono();

api.use(
  "/*",
  cors({
    origin: "http://192.168.0.168:5173",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

api.route("/auth", authRoute);
api.route("/blog", blogRoute);
api.route("/u", userRoute);
api.route("/upload", uploadRoute);

api.get("/", async (c) => {
  return c.text("Health check success!");
});

export default api;
