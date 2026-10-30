import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { dailyStories, bibleStories, bibleBooks } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { runSeed } from "@/db/seed";

export async function GET() {
  try {
    const checkCount = await db.select().from(bibleStories).limit(1);
    if (checkCount.length === 0) {
      await runSeed();
    }

    const today = new Date().toISOString().split("T")[0];

    const dailyResult = await db
      .select({
        id: bibleStories.id,
        slug: bibleStories.slug,
        title: bibleStories.title,
        subtitle: bibleStories.subtitle,
        description: bibleStories.description,
        narrativeContent: bibleStories.narrativeContent,
        imageUrl: bibleStories.imageUrl,
        chapterReference: bibleStories.chapterReference,
        readingTimeMinutes: bibleStories.readingTimeMinutes,
        category: bibleStories.category,
        bookName: bibleBooks.name,
      })
      .from(dailyStories)
      .innerJoin(bibleStories, eq(dailyStories.storyId, bibleStories.id))
      .leftJoin(bibleBooks, eq(bibleStories.bookId, bibleBooks.id))
      .orderBy(desc(dailyStories.id))
      .limit(1);

    if (dailyResult.length > 0) {
      return NextResponse.json({ success: true, daily: dailyResult[0] });
    }

    // Fallback: pick David y Goliat or first story
    const fallback = await db
      .select({
        id: bibleStories.id,
        slug: bibleStories.slug,
        title: bibleStories.title,
        subtitle: bibleStories.subtitle,
        description: bibleStories.description,
        narrativeContent: bibleStories.narrativeContent,
        imageUrl: bibleStories.imageUrl,
        chapterReference: bibleStories.chapterReference,
        readingTimeMinutes: bibleStories.readingTimeMinutes,
        category: bibleStories.category,
        bookName: bibleBooks.name,
      })
      .from(bibleStories)
      .leftJoin(bibleBooks, eq(bibleStories.bookId, bibleBooks.id))
      .where(eq(bibleStories.featured, true))
      .limit(1);

    return NextResponse.json({ success: true, daily: fallback[0] || null });
  } catch (error: any) {
    console.error("GET /api/daily error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
