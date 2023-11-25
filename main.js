import { serve } from "@hono/node-server";

try {
  const app = (await import("./dist/app.js")).default;
  const name = "e-base-node";
  const port = 8000;
  const hostname = "0.0.0.0";
  serve({ port, hostname, fetch: app.fetch }, () => console.log(`[${name}]: ${hostname}:${port}`));
} catch (error) {
  console.error(error);
}
