import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";

export const db = drizzle({
  connection: {
    url: "file:test.db",
  },
  schema: {
    ...auth,
  },
  casing: "snake_case",
});
