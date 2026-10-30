import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bibleBooks, bibleStories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const bookResult = await db.select().from(bibleBooks).where(eq(bibleBooks.slug, slug)).limit(1);

    if (bookResult.length === 0) {
      return NextResponse.json({ success: false, error: "Libro no encontrado" }, { status: 404 });
    }

    const book = bookResult[0];

    // Fetch related stories for this book
    const relatedStories = await db
      .select({
        id: bibleStories.id,
        slug: bibleStories.slug,
        title: bibleStories.title,
        subtitle: bibleStories.subtitle,
        description: bibleStories.description,
        imageUrl: bibleStories.imageUrl,
        chapterReference: bibleStories.chapterReference,
        readingTimeMinutes: bibleStories.readingTimeMinutes,
        category: bibleStories.category,
      })
      .from(bibleStories)
      .where(eq(bibleStories.bookId, book.id));

    return NextResponse.json({
      success: true,
      book,
      stories: relatedStories,
    });
  } catch (error: any) {
    console.error("GET /api/books/[slug] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
