import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const expensesTable = sqliteTable("expenses", {
  id: integer("id").primaryKey(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  title: text("title").notNull(),
  amount: integer("amount").notNull().default(0),
  user_id: text("user_id").notNull(),
});
