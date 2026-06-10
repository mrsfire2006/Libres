import { BookStatus } from '@/libres.domain/enums/book-status';
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './user.schema';
// import { usersTable } from '../../users/infrastructure/user.schema'; // لو حابب تعمل FK على جدول المستخدمين

export const booksTable = pgTable('books', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'), 
  price: integer('price').notNull().default(0), 
  order: integer('order').notNull().default(0), 
  bookStatus: text('book_status').notNull().default(BookStatus.PENDING), 
  accessLink: text('access_link').notNull(),
  rating: integer('rating').notNull().default(0), 
  categoryId: text('category_id'), 
  fingerPrint: text('finger_print').notNull(),
  userId: text('user_id').notNull()
            .references(() => usersTable.id, {onDelete:'restrict'}),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});


export type DrizzleBook = typeof booksTable.$inferSelect;
export type DrizzleNewBook = typeof booksTable.$inferInsert;