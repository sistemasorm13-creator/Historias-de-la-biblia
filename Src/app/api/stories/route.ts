import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bibleStories, bibleBooks, savedStories } from "@/db/schema";
import { eq, like, or, ilike, and, desc } from "drizzle-orm";
import { runSeed } from "@/db/seed";

export async function GET(req: NextRequest) {
  try {
    // Ensure database is populated
    const checkCount = await db.select().from(bibleStories).limit(1);
    if (checkCount.length === 0) {
      await runSeed();
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const testament = searchParams.get("testament") || "";
    const theme = searchParams.get("theme") || "";
    const featured = searchParams.get("featured");
    const userId = searchParams.get("userId");

    let storiesQuery = db
      .select({
        id: bibleStories.id,
        slug: bibleStories.slug,
        title: bibleStories.title,
        subtitle: bibleStories.subtitle,
        description: bibleStories.description,
        imageUrl: bibleStories.imageUrl,
        audioUrl: bibleStories.audioUrl,
        chapterReference: bibleStories.chapterReference,
        readingTimeMinutes: bibleStories.readingTimeMinutes,
        category: bibleStories.category,
        emotionalTheme: bibleStories.emotionalTheme,
        featured: bibleStories.featured,
        bookName: bibleBooks.name,
        testament: bibleBooks.testament,
      })
      .from(bibleStories)
      .leftJoin(bibleBooks, eq(bibleStories.bookId, bibleBooks.id));

    const results = await storiesQuery;

    let filtered = results;

    // Filter by query (title, reference, description, bookName)
    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(lower) ||
          s.chapterReference.toLowerCase().includes(lower) ||
          (s.description && s.description.toLowerCase().includes(lower)) ||
          (s.bookName && s.bookName.toLowerCase().includes(lower)) ||
          (s.emotionalTheme && s.emotionalTheme.toLowerCase().includes(lower))
      );
    }

    // Filter by Testament
    if (testament) {
      if (testament === "Antiguo Testamento" || testament === "OT") {
        filtered = filtered.filter((s) => s.testament === "OT");
      } else if (testament === "Nuevo Testamento" || testament === "NT") {
        filtered = filtered.filter((s) => s.testament === "NT");
      }
    }

    // Filter by Category
    if (category && category !== "Todos") {
      filtered = filtered.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase() || (s.subtitle && s.subtitle.toLowerCase().includes(category.toLowerCase()))
      );
    }

    // Filter by Theme
    if (theme) {
      filtered = filtered.filter((s) => s.emotionalTheme?.toLowerCase() === theme.toLowerCase());
    }

    // Filter by Featured
    if (featured === "true") {
      filtered = filtered.filter((s) => s.featured);
    }

    // Fetch saved story IDs for user if provided
    let savedStoryIds: number[] = [];
    if (userId) {
      const saved = await db.select().from(savedStories).where(eq(savedStories.userId, userId));
      savedStoryIds = saved.map((s) => s.storyId);
    }

    const responseData = filtered.map((s) => ({
      ...s,
      isSaved: savedStoryIds.includes(s.id),
    }));

    return NextResponse.json({ success: true, stories: responseData });
  } catch (error: any) {
    console.error("GET /api/stories error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, subtitle, description, narrativeContent, literalContent, imageUrl, audioUrl, bookId, chapterReference, readingTimeMinutes, category, emotionalTheme, featured, scenesJson } = body;

    if (!title || !narrativeContent) {
      return NextResponse.json({ success: false, error: "Title and narrative content are required" }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newStory = await db.insert(bibleStories).values({
      title,
      slug: generatedSlug,
      subtitle: subtitle || "",
      description: description || "",
      narrativeContent,
      literalContent: literalContent || "",
      imageUrl: imageUrl || "/images/david-goliath.jpg",
      audioUrl: audioUrl || null,
      bookId: bookId || 1,
      chapterReference: chapterReference || "Génesis 1",
      readingTimeMinutes: readingTimeMinutes || 5,
      category: category || "Historias Populares",
      emotionalTheme: emotionalTheme || "Fe",
      featured: featured || false,
      scenesJson: scenesJson ? JSON.stringify(scenesJson) : null,
    }).returning();

    return NextResponse.json({ success: true, story: newStory[0] });
  } catch (error: any) {
    console.error("POST /api/stories error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
