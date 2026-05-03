import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  bigint,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * MANDATE SUBMISSION LOG
 * Immutable append-only record of institutional deployment mandates
 * 
 * Purpose: Create institutional accountability chain
 * "This standard now exists. Any deployment outside it becomes a recorded deviation."
 * 
 * Every field except anchor_links_opened is required.
 * No submission completes without authorisation_level.
 */
export const mandateSubmissions = mysqlTable("mandate_submissions", {
  // Immutable identifier
  submissionId: varchar("submission_id", { length: 36 })
    .primaryKey()
    .notNull(),

  // Timestamp (UTC)
  timestamp: timestamp("timestamp").defaultNow().notNull(),

  // Institution details
  institutionName: varchar("institution_name", { length: 255 }).notNull(),

  // Authorisation level - MANDATORY
  // Determines institutional pressure weight
  authorisationLevel: mysqlEnum("authorisation_level", [
    "Board",
    "Risk Committee",
    "Credit Officer",
    "IT Operations",
  ]).notNull(),

  // Capital commitment
  capitalRange: mysqlEnum("capital_range", [
    "<10M",
    "10M-100M",
    "100M-1B",
    ">1B",
  ]).notNull(),

  // Sector focus
  sector: varchar("sector", { length: 100 }).notNull(),

  // Which view was active when submitted
  modeViewed: mysqlEnum("mode_viewed", ["Executive", "Technical", "Audit"])
    .default("Executive")
    .notNull(),

  // Where did the reader toggle between modes (if at all)
  frictionPoint: varchar("friction_point", { length: 255 }),

  // External sources accessed before submission
  // Array of: ["audit_trail", "cycle_data", "cycle_replay"]
  anchorLinksOpened: json("anchor_links_opened").$type<string[]>(),

  // Verbatim declaration text shown to user
  // Immutable - this is what they agreed to
  declarationText: text("declaration_text").notNull(),

  // Metadata for audit trail
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),

  // Indexed for queries
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type MandateSubmission = typeof mandateSubmissions.$inferSelect;
export type InsertMandateSubmission = typeof mandateSubmissions.$inferInsert;

/**
 * FRICTION ANALYTICS LOG
 * Audit trail of institutional engagement with the instrument
 * 
 * Three events matter:
 * 1. Mode selection - which view does institutional reader select first?
 * 2. Anchor link opens - which external sources are accessed, when?
 * 3. Friction point interaction - time spent on 720h vs 24h reconciliation
 */
export const frictionAnalytics = mysqlTable("friction_analytics", {
  eventId: varchar("event_id", { length: 36 }).primaryKey().notNull(),

  // Event type
  eventType: mysqlEnum("event_type", [
    "mode_selection",
    "anchor_link_open",
    "friction_point_enter",
    "friction_point_exit",
    "form_start",
    "form_submit",
    "form_abandon",
  ]).notNull(),

  // Which mode was selected (for mode_selection events)
  modeSelected: mysqlEnum("mode_selected", [
    "Executive",
    "Technical",
    "Audit",
  ]),

  // Which anchor link was opened
  anchorLinkType: mysqlEnum("anchor_link_type", [
    "audit_trail",
    "cycle_data",
    "cycle_replay",
  ]),

  // Section name for friction point events
  sectionName: varchar("section_name", { length: 100 }),

  // Duration in milliseconds (for dwell time)
  durationMs: bigint("duration_ms", { mode: "number" }),

  // Scroll position when event occurred
  scrollPosition: int("scroll_position"),

  // Session identifier (to group events from same visitor)
  sessionId: varchar("session_id", { length: 36 }),

  // Metadata
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),

  // Timestamp
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type FrictionAnalytic = typeof frictionAnalytics.$inferSelect;
export type InsertFrictionAnalytic = typeof frictionAnalytics.$inferInsert;