import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

export const akunTable = sqliteTable("akun", {
  id: int().primaryKey({ autoIncrement: true }),
  kode: text().notNull(),
  nama: text().notNull(),
  kategori: text().notNull(),
  deskripsi: text().notNull(),
  ...timestamp,
});

export type Akun = InferSelectModel<typeof akunTable>;
export type NewAkun = InferInsertModel<typeof akunTable>;
