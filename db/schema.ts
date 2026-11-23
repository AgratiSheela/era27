import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const enquiries = sqliteTable('enquiries', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  accountEmail: text('account_email').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  occasion: text('occasion').notNull(),
  eventDate: text('event_date').notNull().default(''),
  guests: integer('guests'),
  budget: integer('budget'),
  ideas: text('ideas').notNull().default(''),
  status: text('status').notNull().default('New'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
}, table => [index('enquiries_owner_created').on(table.userId, table.createdAt)]);
