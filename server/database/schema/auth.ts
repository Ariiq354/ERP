import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

export const userTable = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  password: text().notNull(),
  ...timestamp,
});

export const sessionTable = sqliteTable("session", {
  id: text().primaryKey(),
  userId: int()
    .notNull()
    .references(() => userTable.id),
  expiresAt: int({ mode: "timestamp" }).notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type NewUser = InferInsertModel<typeof userTable>;

export type UserLucia = Omit<User, "createdAt" | "updatedAt" | "password">;

export type Session = InferSelectModel<typeof sessionTable>;
export type NewSession = InferInsertModel<typeof sessionTable>;
