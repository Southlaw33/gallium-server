import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { betterAuthServerClient } from "./integrations/better-auth";

const allRoutes = new Hono();
allRoutes.use(
  cors({
    origin: "http://localhost:4000",
    allowHeaders: ["Authorization", "Content-Type"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

allRoutes.on(["GET", "POST"], "/api/auth/**", (c) => {
  return betterAuthServerClient.handler(c.req.raw);
});

allRoutes.get("", (c) => {
  return c.json("Hello Hono!", 200);
});

serve(allRoutes, ({ port }) => {
  console.log(`Server is running on http://localhost:${port}`);
});
