import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const emptyTextArray = sql`'{}'::text[]`;

export const portfolioProjects = pgTable("portfolio_projects", {
  id: varchar("id", { length: 80 }).primaryKey(),
  iconName: varchar("icon_name", { length: 40 }).notNull().default("layers"),
  iconLabel: varchar("icon_label", { length: 120 }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  meta: varchar("meta", { length: 160 }).notNull(),
  image: text("image").notNull(),
  imageAlt: varchar("image_alt", { length: 240 }).notNull(),
  imageRatio: real("image_ratio").notNull().default(1.4),
  story: text("story"),
  techStack: text("tech_stack").array().notNull().default(emptyTextArray),
  caseHighlights: text("case_highlights").array().notNull().default(emptyTextArray),
  repositoryUrl: text("repository_url").notNull().default(""),
  liveUrl: text("live_url").notNull().default(""),
  secondaryUrl: text("secondary_url").notNull().default(""),
  secondaryLabel: varchar("secondary_label", { length: 80 }).notNull().default(""),
  role: varchar("role", { length: 120 }).notNull().default(""),
  timeline: varchar("timeline", { length: 80 }).notNull().default(""),
  category: varchar("category", { length: 80 }).notNull().default(""),
  metrics: text("metrics").array().notNull().default(emptyTextArray),
  featured: boolean("featured").notNull().default(false),
  decisions: text("decisions").array().notNull().default(emptyTextArray),
  learnings: text("learnings").array().notNull().default(emptyTextArray),
  evidence: text("evidence").array().notNull().default(emptyTextArray),
  gallery: text("gallery").array().notNull().default(emptyTextArray),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const portfolioProfile = pgTable("portfolio_profile", {
  id: varchar("id", { length: 20 }).primaryKey(),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  headlineOne: varchar("headline_one", { length: 120 }).notNull(),
  headlineTwo: varchar("headline_two", { length: 120 }).notNull(),
  intro: text("intro").notNull(),
  aboutIntro: text("about_intro").notNull().default(""),
  location: varchar("location", { length: 160 }).notNull().default(""),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  workAuthorization: varchar("work_authorization", { length: 100 }).notNull().default(""),
  email: varchar("email", { length: 254 }).notNull(),
  portraitDefault: text("portrait_default").notNull(),
  portraitHover: text("portrait_hover").notNull(),
  linkedInUrl: text("linkedin_url").notNull(),
  githubUrl: text("github_url").notNull().default(""),
  leetcodeUrl: text("leetcode_url").notNull().default(""),
  xUrl: text("x_url").notNull().default(""),
  targetRoles: text("target_roles").array().notNull().default(emptyTextArray),
  contactIntro: text("contact_intro").notNull(),
  footerCredit: varchar("footer_credit", { length: 120 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  subject: varchar("subject", { length: 160 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const portfolioResume = pgTable("portfolio_resume", {
  id: varchar("id", { length: 20 }).primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  location: varchar("location", { length: 160 }).notNull(),
  summary: text("summary").notNull(),
  latexSource: text("latex_source").notNull(),
  resumeData: jsonb("resume_data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

