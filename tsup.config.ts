import { defineConfig } from "tsup";

import dotenv from "dotenv";

import * as v from "valibot";

export default defineConfig(({ env = {}, ...options }) => {
  const EnvSchema = v.object({
    NODE_ENV: v.picklist(["development", "production"]),
    APP_NAME: v.string(),
  });

  const NODE_ENV = env.NODE_ENV;
  const DEVELOPMENT = NODE_ENV === "development";
  const PRODUCTION = NODE_ENV === "production";

  const result = dotenv.config();
  if (!result.error) Object.assign(env, result.parsed!);

  Object.keys(EnvSchema.entries).forEach((key) => {
    if (key in process.env) env[key] = v.parse(EnvSchema.entries[key as keyof typeof EnvSchema.entries], process.env[key]);
  });

  return {
    ...options,
    env: v.parse(EnvSchema, env),
    entry: ["src/app.ts"],
    format: "esm",
    target: "node20",
    watch: DEVELOPMENT,
    clean: PRODUCTION,
    minify: PRODUCTION,
  };
});
