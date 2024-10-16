import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./server/database/schema",
  dbCredentials: {
    url: "file:test.db",
  },
  casing: "snake_case",
});
