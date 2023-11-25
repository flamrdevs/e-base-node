import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { compress } from "hono/compress";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors({ origin: "*" }), compress());

app
  .get("/", (ctx) => ctx.json({ name: "e-base-node" }, 200))
  .notFound((ctx) => ctx.json({ message: "Not found" }, 404))
  .onError((err, ctx) => {
    if (err instanceof HTTPException) return err.getResponse();
    let message = "Internal server error";
    if (err instanceof Error) message = err.message;
    return ctx.json({ message }, 500);
  });

export default app;
