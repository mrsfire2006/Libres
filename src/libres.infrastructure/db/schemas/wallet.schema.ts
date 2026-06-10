import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { usersTable } from './user.schema';
import { WalletStatus } from '@/libres.domain/enums/wallet-status';

export const walletsTable = pgTable('wallets', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'restrict' }),
  balance: integer('balance').notNull().default(500),
  status: text('status').notNull().default(WalletStatus.ACTIVE),
  currency: text('currency').notNull().default('$'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastUpdate: timestamp('last_update'),
});


export type DrizzleWallet = typeof walletsTable.$inferSelect;