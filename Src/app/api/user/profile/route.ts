import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { usersProfiles, readingProgress, savedStories, userAchievements, bibleStories, bibleBooks } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { runSeed } from "@/db/seed";

export async function GET(req: NextRequest) {
  try {
    const checkCount = await db.select().from(usersProfiles).limit(1);
    if (checkCount.length === 0) {
      await runSeed();
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "user-demo";

    let userResult = await db.select().from(usersProfiles).where(eq(usersProfiles.id, userId)).limit(1);

    if (userResult.length === 0) {
      // Return default profile
      userResult = await db.select().from(usersProfiles).where(eq(usersProfiles.id, "user-demo")).limit(1);
    }

    const user = userResult[0];

    // Get statistics
    const completedStories = await db
      .select()
      .from(readingProgress)
      .where(and(eq(readingProgress.userId, user.id), eq(readingProgress.completed, true)));

    const savedCount = await db
      .select()
      .from(savedStories)
      .where(eq(savedStories.userId, user.id));

    const achievements = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, user.id));

    // Last read story
    const lastRead = await db
      .select({
        id: bibleStories.id,
        slug: bibleStories.slug,
        title: bibleStories.title,
        chapterReference: bibleStories.chapterReference,
        imageUrl: bibleStories.imageUrl,
        readingTimeMinutes: bibleStories.readingTimeMinutes,
        lastReadAt: readingProgress.lastReadAt,
        progressPercentage: readingProgress.progressPercentage,
      })
      .from(readingProgress)
      .innerJoin(bibleStories, eq(readingProgress.storyId, bibleStories.id))
      .where(eq(readingProgress.userId, user.id))
      .orderBy(desc(readingProgress.lastReadAt))
      .limit(1);

    const totalStoriesCount = (await db.select().from(bibleStories)).length;

    return NextResponse.json({
      success: true,
      profile: {
        ...user,
        storiesReadCount: completedStories.length,
        storiesSavedCount: savedCount.length,
        totalStoriesAvailable: totalStoriesCount,
        achievements: achievements.map((a) => a.achievementKey),
        lastReadStory: lastRead.length > 0 ? lastRead[0] : null,
      },
    });
  } catch (error: any) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId = "user-demo", name, avatarUrl } = await req.json();

    const updated = await db
      .update(usersProfiles)
      .set({
        name: name,
        avatarUrl: avatarUrl,
      })
      .where(eq(usersProfiles.id, userId))
      .returning();

    return NextResponse.json({ success: true, profile: updated[0] });
  } catch (error: any) {
    console.error("PUT /api/user/profile error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
