/* ------------------------------------------------------------------
 * schema.ts  –  Drizzle ORM definitions for the Vibe Polling service
 * ------------------------------------------------------------------
 * Tables
 *  ├─ polls
 *  ├─ poll_options
 *  ├─ poll_votes
 *  └─ events  (append-only domain event log)
 * ------------------------------------------------------------------ */

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

/* ---------- Polls ---------------------------------- */
export const pollStatusEnum = pgEnum("poll_status", ["draft", "open", "closed", "archived"]);
export const voteModeEnum = pgEnum("vote_mode", ["single", "multi"]);

export const polls = pgTable("polls", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: pollStatusEnum("status").default("open").notNull(),
  voteMode: voteModeEnum("vote_mode").default("single").notNull(),
  expiresAt: timestamp("expires_at").default(sql`now() + interval '7 days'`).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* ---------- Poll Options --------------------------- */
export const pollOptions = pgTable(
  "poll_options",
  {
    id: serial("id").primaryKey(),
    pollId: integer("poll_id")
      .references(() => polls.id)
      .notNull(),
    label: text("label").notNull(),
    orderKey: integer("order_key").notNull(), // 10,20,…で並び替え
  },
  (t) => ({
    uniqueOrder: unique("u_poll_option_order").on(t.pollId, t.orderKey),
  }),
);

/* ---------- Poll Votes ----------------------------- */
export const pollVotes = pgTable(
  "poll_votes",
  {
    id: serial("id").primaryKey(),
    pollId: integer("poll_id")
      .references(() => polls.id)
      .notNull(),
    optionId: integer("option_id")
      .references(() => pollOptions.id)
      .notNull(),
    voterHash: text("voter_hash").notNull(), // 匿名デバイス識別
    votedAt: timestamp("voted_at").defaultNow().notNull(),
  },
  (t) => ({
    uOptionVoter: unique("u_option_voter").on(t.optionId, t.voterHash),
  }),
);

/* ---------- Domain Events (append-only) ------------------------- */

export type EventKind =
  | "poll_created"
  | "poll_updated"
  | "poll_closed"
  | "poll_archived"
  | "poll_deleted"
  | "option_added"
  | "option_updated"
  | "option_deleted"
  | "vote_created"
  | "vote_deleted";

export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    kind: text("kind").$type<EventKind>().notNull(),
    payload: jsonb("payload").notNull(), // schema-versioned blob
    occurredAt: timestamp("occurred_at").defaultNow().notNull(),
  },
  (t) => ({
    idxKindTime: index("idx_events_kind_time").on(t.kind, t.occurredAt),
  }),
);
