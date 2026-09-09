import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const accountTypeEnum = pgEnum("account_type", [
  "candidate",
  "employer",
]);

export const ageRangeEnum = pgEnum("age_range", ["16-18", "19-21", "22-24"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  accountType: accountTypeEnum("account_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const candidateProfiles = pgTable("candidate_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  firstName: text("first_name").notNull(),
  ageRange: ageRangeEnum("age_range").notNull(),
  postcode: text("postcode").notNull(),
  town: text("town").notNull(),
  tradeInterests: text("trade_interests").array().notNull().default([]),
  currentlyStudying: text("currently_studying"),
  workExperience: text("work_experience"),
  certifications: text("certifications").array().notNull().default([]),
  bio: text("bio").notNull().default(""),
  photoUrl: text("photo_url"),
  canDrive: boolean("can_drive").notNull().default(false),
  hasCscs: boolean("has_cscs").notNull().default(false),
  hasEcs: boolean("has_ecs").notNull().default(false),
  hasGcseMaths: boolean("has_gcse_maths").notNull().default(false),
  hasGcseEnglish: boolean("has_gcse_english").notNull().default(false),
  profileComplete: boolean("profile_complete").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const employerProfiles = pgTable("employer_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  companyName: text("company_name").notNull(),
  trade: text("trade").notNull(),
  town: text("town").notNull(),
  postcode: text("postcode").notNull(),
  logoUrl: text("logo_url"),
  bio: text("bio").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  recipientId: uuid("recipient_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  candidateProfile: one(candidateProfiles, {
    fields: [users.id],
    references: [candidateProfiles.userId],
  }),
  employerProfile: one(employerProfiles, {
    fields: [users.id],
    references: [employerProfiles.userId],
  }),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
}));

export const candidateProfilesRelations = relations(
  candidateProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [candidateProfiles.userId],
      references: [users.id],
    }),
  }),
);

export const employerProfilesRelations = relations(
  employerProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [employerProfiles.userId],
      references: [users.id],
    }),
  }),
);

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sentMessages",
  }),
  recipient: one(users, {
    fields: [messages.recipientId],
    references: [users.id],
    relationName: "receivedMessages",
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CandidateProfile = typeof candidateProfiles.$inferSelect;
export type NewCandidateProfile = typeof candidateProfiles.$inferInsert;
export type EmployerProfile = typeof employerProfiles.$inferSelect;
export type NewEmployerProfile = typeof employerProfiles.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type AccountType = (typeof accountTypeEnum.enumValues)[number];
export type AgeRange = (typeof ageRangeEnum.enumValues)[number];
