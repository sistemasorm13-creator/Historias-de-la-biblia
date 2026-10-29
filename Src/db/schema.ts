import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const usersProfiles = pgTable("users_profiles", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user").notNull(), // "user" or "admin"
  streakDays: integer("streak_days").default(1).notNull(),
  totalReadingMinutes: integer("total_reading_minutes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bibleBooks = pgTable("bible_books", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  testament: text("testament").notNull(), // 'OT' | 'NT'
  category: text("category").notNull(), // 'Pentateuco', 'Históricos', 'Poéticos', etc.
  description: text("description").notNull(),
  author: text("author").notNull(),
  historicalContext: text("historical_context").notNull(),
  bookOrder: integer("book_order").notNull(),
  chaptersCount: integer("chapters_count").notNull(),
  iconType: text("icon_type").default("book").notNull(),
});

export const bibleChapters = pgTable("bible_chapters", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => bibleBooks.id, { onDelete: "cascade" }),
  chapterNumber: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
});

export const bibleStories = pgTable("bible_stories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  narrativeContent: text("narrative_content").notNull(),
  literalContent: text("literal_content").notNull(),
  imageUrl: text("image_url").notNull(),
  audioUrl: text("audio_url"),
  bookId: integer("book_id").references(() => bibleBooks.id, { onDelete: "cascade" }),
  chapterReference: text("chapter_reference").notNull(),
  readingTimeMinutes: integer("reading_time_minutes").default(5).notNull(),
  category: text("category").notNull(), // 'Historias Populares', 'Milagros de Jesús', 'Parábolas', etc.
  emotionalTheme: text("emotional_theme"), // 'Ansiedad', 'Esperanza', 'Paciencia', 'Perdón', 'Gratitud', 'Sabiduría', 'Fe'
  featured: boolean("featured").default(false).notNull(),
  scenesJson: text("scenes_json"), // JSON for illustrated scene mode
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savedStories = pgTable("saved_stories", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  storyId: integer("story_id").references(() => bibleStories.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const readingProgress = pgTable("reading_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  storyId: integer("story_id").references(() => bibleStories.id, { onDelete: "cascade" }).notNull(),
  progressPercentage: integer("progress_percentage").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
  lastReadAt: timestamp("last_read_at").defaultNow().notNull(),
});

export const dailyStories = pgTable("daily_stories", {
  id: serial("id").primaryKey(),
  storyId: integer("story_id").references(() => bibleStories.id, { onDelete: "cascade" }).notNull(),
  featuredDate: text("featured_date").notNull(), // YYYY-MM-DD
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  achievementKey: text("achievement_key").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});
