import { defineConfig } from "tsup";

export default defineConfig((options) => {
  const NODE_ENV = options.env?.NODE_ENV;
  const DEVELOPMENT = NODE_ENV === "development";
  const PRODUCTION = NODE_ENV === "production";
  return {
    ...options,
    entry: ["src/app.ts"],
    format: "esm",
    target: "node20",
    watch: DEVELOPMENT,
    clean: PRODUCTION,
    minify: PRODUCTION,
  };
});
