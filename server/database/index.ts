import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as finance from "./schema/finance";

export const db = drizzle({
  connection: {
    url: "file:test.db",
  },
  schema: {
    ...auth,
    ...finance,
  },
  casing: "snake_case",
});
