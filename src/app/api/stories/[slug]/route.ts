import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bibleStories, bibleBooks, savedStories, readingProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Try finding by slug or id
    let storyResult = await db
      .select({
        id: bibleStories.id,
        slug: bibleStories.slug,
        title: bibleStories.title,
        subtitle: bibleStories.subtitle,
        description: bibleStories.description,
        narrativeContent: bibleStories.narrativeContent,
        literalContent: bibleStories.literalContent,
        imageUrl: bibleStories.imageUrl,
        audioUrl: bibleStories.audioUrl,
        chapterReference: bibleStories.chapterReference,
        readingTimeMinutes: bibleStories.readingTimeMinutes,
        category: bibleStories.category,
        emotionalTheme: bibleStories.emotionalTheme,
        featured: bibleStories.featured,
        scenesJson: bibleStories.scenesJson,
        bookId: bibleStories.bookId,
        bookName: bibleBooks.name,
        bookSlug: bibleBooks.slug,
        testament: bibleBooks.testament,
      })
      .from(bibleStories)
      .leftJoin(bibleBooks, eq(bibleStories.bookId, bibleBooks.id))
      .where(eq(bibleStories.slug, slug))
      .limit(1);

    if (storyResult.length === 0 && !isNaN(Number(slug))) {
      storyResult = await db
        .select({
          id: bibleStories.id,
          slug: bibleStories.slug,
          title: bibleStories.title,
          subtitle: bibleStories.subtitle,
          description: bibleStories.description,
          narrativeContent: bibleStories.narrativeContent,
          literalContent: bibleStories.literalContent,
          imageUrl: bibleStories.imageUrl,
          audioUrl: bibleStories.audioUrl,
          chapterReference: bibleStories.chapterReference,
          readingTimeMinutes: bibleStories.readingTimeMinutes,
          category: bibleStories.category,
          emotionalTheme: bibleStories.emotionalTheme,
          featured: bibleStories.featured,
          scenesJson: bibleStories.scenesJson,
          bookId: bibleStories.bookId,
          bookName: bibleBooks.name,
          bookSlug: bibleBooks.slug,
          testament: bibleBooks.testament,
        })
        .from(bibleStories)
        .leftJoin(bibleBooks, eq(bibleStories.bookId, bibleBooks.id))
        .where(eq(bibleStories.id, Number(slug)))
        .limit(1);
    }

    if (storyResult.length === 0) {
      return NextResponse.json({ success: false, error: "Historia no encontrada" }, { status: 404 });
    }

    const story = storyResult[0];

    // Check if saved
    let isSaved = false;
    let userProgress = 0;
    let completed = false;

    if (userId) {
      const savedCheck = await db
        .select()
        .from(savedStories)
        .where(and(eq(savedStories.userId, userId), eq(savedStories.storyId, story.id)));
      isSaved = savedCheck.length > 0;

      const progCheck = await db
        .select()
        .from(readingProgress)
        .where(and(eq(readingProgress.userId, userId), eq(readingProgress.storyId, story.id)));
      if (progCheck.length > 0) {
        userProgress = progCheck[0].progressPercentage;
        completed = progCheck[0].completed;
      }
    }

    // Parse scenes
    let scenes = [];
    if (story.scenesJson) {
      try {
        scenes = JSON.parse(story.scenesJson);
      } catch (e) {
        scenes = [];
      }
    }

    // Get adjacent stories for Next/Previous
    const allStories = await db.select({ slug: bibleStories.slug, title: bibleStories.title }).from(bibleStories);
    const currentIndex = allStories.findIndex((s) => s.slug === story.slug);
    const nextStory = currentIndex >= 0 && currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;
    const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;

    return NextResponse.json({
      success: true,
      story: {
        ...story,
        scenes,
        isSaved,
        userProgress,
        completed,
        nextStory,
        prevStory,
      },
    });
  } catch (error: any) {
    console.error("GET /api/stories/[slug] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await db.delete(bibleStories).where(eq(bibleStories.slug, slug));
    return NextResponse.json({ success: true, message: "Historia eliminada" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
