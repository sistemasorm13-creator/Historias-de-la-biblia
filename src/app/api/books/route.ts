import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bibleBooks, bibleStories } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { runSeed } from "@/db/seed";

export async function GET(req: NextRequest) {
  try {
    const checkCount = await db.select().from(bibleBooks).limit(1);
    if (checkCount.length === 0) {
      await runSeed();
    }

    const { searchParams } = new URL(req.url);
    const testament = searchParams.get("testament");
    const category = searchParams.get("category");

    let books = await db.select().from(bibleBooks).orderBy(asc(bibleBooks.bookOrder));

    if (testament) {
      if (testament === "OT" || testament === "Antiguo Testamento") {
        books = books.filter((b) => b.testament === "OT");
      } else if (testament === "NT" || testament === "Nuevo Testamento") {
        books = books.filter((b) => b.testament === "NT");
      }
    }

    if (category) {
      books = books.filter((b) => b.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({ success: true, books });
  } catch (error: any) {
    console.error("GET /api/books error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
