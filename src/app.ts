import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { compress } from "hono/compress";
import { cors } from "hono/cors";

const env = {
  APP_NAME: process.env.APP_NAME,
};

const app = new Hono();

app.use("*", cors({ origin: "*" }), compress());

app.get("/env", (ctx) => ctx.json(env));

app
  .get("/", (ctx) => ctx.json({ name: env.APP_NAME }, 200))
  .notFound((ctx) => ctx.json({ message: "Not found" }, 404))
  .onError((err, ctx) => {
    if (err instanceof HTTPException) return err.getResponse();
    let message = "Internal server error";
    if (err instanceof Error) message = err.message;
    return ctx.json({ message }, 500);
  });

export default app;
