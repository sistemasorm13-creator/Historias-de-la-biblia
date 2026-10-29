import { db } from "./index";
import { bibleBooks, bibleStories, dailyStories, usersProfiles } from "./schema";
import { BOOKS_DATA, STORIES_DATA } from "./seedData";
import { eq } from "drizzle-orm";

export async function runSeed() {
  console.log("Checking database seeds...");

  // Seed default admin user
  const existingAdmin = await db.select().from(usersProfiles).where(eq(usersProfiles.id, "admin-1")).limit(1);
  if (existingAdmin.length === 0) {
    await db.insert(usersProfiles).values({
      id: "admin-1",
      email: "admin@historiasbiblicas.com",
      name: "Administrador Bíblico",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      role: "admin",
      streakDays: 7,
      totalReadingMinutes: 120,
    });
    console.log("Admin profile seeded.");
  }

  // Seed default guest/demo user
  const existingUser = await db.select().from(usersProfiles).where(eq(usersProfiles.id, "user-demo")).limit(1);
  if (existingUser.length === 0) {
    await db.insert(usersProfiles).values({
      id: "user-demo",
      email: "lector@historiasbiblicas.com",
      name: "Lector Fiel",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      role: "user",
      streakDays: 3,
      totalReadingMinutes: 45,
    });
    console.log("Demo user profile seeded.");
  }

  // Seed Books
  const existingBooks = await db.select().from(bibleBooks);
  if (existingBooks.length === 0) {
    console.log("Seeding 66 Bible Books...");
    for (const b of BOOKS_DATA) {
      await db.insert(bibleBooks).values({
        slug: b.slug,
        name: b.name,
        testament: b.testament,
        category: b.category,
        description: b.description,
        author: b.author,
        historicalContext: b.historicalContext,
        bookOrder: b.bookOrder,
        chaptersCount: b.chaptersCount,
        iconType: b.iconType,
      });
    }
    console.log("66 Bible Books seeded.");
  }

  // Map book slug to book id
  const allBooks = await db.select().from(bibleBooks);
  const bookSlugToId = new Map<string, number>();
  allBooks.forEach((bk) => bookSlugToId.set(bk.slug, bk.id));

  // Seed Stories
  const existingStories = await db.select().from(bibleStories);
  if (existingStories.length === 0) {
    console.log("Seeding Bible Stories...");
    for (const s of STORIES_DATA) {
      const bookId = bookSlugToId.get(s.bookSlug) || allBooks[0].id;
      await db.insert(bibleStories).values({
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        narrativeContent: s.narrativeContent.trim(),
        literalContent: s.literalContent.trim(),
        imageUrl: s.imageUrl,
        audioUrl: s.audioUrl || null,
        bookId: bookId,
        chapterReference: s.chapterReference,
        readingTimeMinutes: s.readingTimeMinutes,
        category: s.category,
        emotionalTheme: s.emotionalTheme,
        featured: s.featured,
        scenesJson: JSON.stringify(s.scenes),
      });
    }
    console.log("Bible Stories seeded.");
  }

  // Seed Daily Story
  const existingDaily = await db.select().from(dailyStories);
  if (existingDaily.length === 0) {
    const featuredStory = await db.select().from(bibleStories).where(eq(bibleStories.slug, "david-y-goliat")).limit(1);
    if (featuredStory.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      await db.insert(dailyStories).values({
        storyId: featuredStory[0].id,
        featuredDate: today,
      });
      console.log("Daily story seeded.");
    }
  }

  console.log("Seeding complete!");
}
