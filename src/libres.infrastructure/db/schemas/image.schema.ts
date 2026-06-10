import { pgTable, text } from "drizzle-orm/pg-core";
import { booksTable } from "./book.schema";

export const bookImagesTable = pgTable("book_images", {
  id: text("id").primaryKey(),
  link: text("link").notNull(),
  bookId: text("book_id")
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade" }),
});

export type DrizzleBookImage = typeof bookImagesTable.$inferSelect;
export type DrizzleNewBookImage = typeof bookImagesTable.$inferInsert;
