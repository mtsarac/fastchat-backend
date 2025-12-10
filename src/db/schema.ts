import {
  boolean,
  timestamp,
  uuid,
  pgTable,
  varchar,
  bigint,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

enum conType {
  PRIVATE = 'private',
  GROUP = 'group',
}

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
  is_active: boolean().default(false).notNull(),

  // last_seen_at: timestamp(),
});

export const conversations = pgTable('conversations', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),

  type: varchar({ length: 20 }).notNull().default(conType.PRIVATE),

  created_by: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  // icon_url: varchar({ length: 512 }),
});

export const conversation_members = pgTable(
  'conversation_members',
  {
    id: uuid().primaryKey().defaultRandom(),
    conversation_id: uuid()
      .notNull()
      .references(() => conversations.id, { onDelete: 'cascade' }),
    user_id: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    joined_at: timestamp().defaultNow().notNull(),

    // role: varchar({ length: 50 }).notNull().default('member'),

    // notifications_muted: boolean().notNull().default(false),

    // last_read_message_id: uuid().references(() => messages.id),
  },
  (table) => ({
    conversationUserUnique: uniqueIndex('conversation_user_unique').on(
      table.conversation_id,
      table.user_id,
    ),
  }),
);

export const messages = pgTable('messages', {
  id: uuid().primaryKey().defaultRandom(),
  conversation_id: uuid()
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  sender_id: uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  content: varchar({ length: 1000 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  // updated_at: timestamp().defaultNow().notNull(),

  // reply_to_message_id: uuid().references(() => messages.id),

  // deleted_at: timestamp(),
});

export const attachments = pgTable('attachments', {
  id: uuid().primaryKey().defaultRandom(),
  message_id: uuid()
    .notNull()
    .references(() => messages.id, { onDelete: 'cascade' }),
  url: varchar({ length: 2048 }).notNull(),
  file_name: varchar({ length: 255 }).notNull(),
  mime_type: varchar({ length: 100 }).notNull(),
  file_size: bigint({ mode: 'number' }).notNull(), // byte
  created_at: timestamp().defaultNow().notNull(),

  // meta-data
  // width: integer(),   // image/video width
  // height: integer(),  // image/video height
  // duration: integer() // seconds (audio/video)
});
