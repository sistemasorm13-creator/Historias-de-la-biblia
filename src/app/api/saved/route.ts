import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { savedStories, bibleStories, bibleBooks } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "user-demo";

    const savedList = await db
      .select({
        savedId: savedStories.id,
        savedAt: savedStories.createdAt,
        id: bibleStories.id,
        slug: bibleStories.slug,
        title: bibleStories.title,
        subtitle: bibleStories.subtitle,
        description: bibleStories.description,
        imageUrl: bibleStories.imageUrl,
        chapterReference: bibleStories.chapterReference,
        readingTimeMinutes: bibleStories.readingTimeMinutes,
        category: bibleStories.category,
        bookName: bibleBooks.name,
      })
      .from(savedStories)
      .innerJoin(bibleStories, eq(savedStories.storyId, bibleStories.id))
      .leftJoin(bibleBooks, eq(bibleStories.bookId, bibleBooks.id))
      .where(eq(savedStories.userId, userId))
      .orderBy(desc(savedStories.createdAt));

    return NextResponse.json({ success: true, saved: savedList });
  } catch (error: any) {
    console.error("GET /api/saved error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId = "user-demo", storyId } = await req.json();

    if (!storyId) {
      return NextResponse.json({ success: false, error: "storyId required" }, { status: 400 });
    }

    // Check if already saved
    const existing = await db
      .select()
      .from(savedStories)
      .where(and(eq(savedStories.userId, userId), eq(savedStories.storyId, Number(storyId))));

    if (existing.length > 0) {
      // Remove
      await db
        .delete(savedStories)
        .where(and(eq(savedStories.userId, userId), eq(savedStories.storyId, Number(storyId))));

      return NextResponse.json({ success: true, saved: false, message: "Historia eliminada de guardados" });
    } else {
      // Add
      await db.insert(savedStories).values({
        userId,
        storyId: Number(storyId),
      });

      return NextResponse.json({ success: true, saved: true, message: "Historia guardada con éxito" });
    }
  } catch (error: any) {
    console.error("POST /api/saved error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
