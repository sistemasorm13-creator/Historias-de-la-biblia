import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { readingProgress, userAchievements, usersProfiles } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userId = "user-demo", storyId, progressPercentage, completed } = await req.json();

    if (!storyId) {
      return NextResponse.json({ success: false, error: "storyId required" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(readingProgress)
      .where(and(eq(readingProgress.userId, userId), eq(readingProgress.storyId, Number(storyId))));

    if (existing.length > 0) {
      await db
        .update(readingProgress)
        .set({
          progressPercentage: progressPercentage ?? existing[0].progressPercentage,
          completed: completed ?? existing[0].completed,
          lastReadAt: new Date(),
        })
        .where(eq(readingProgress.id, existing[0].id));
    } else {
      await db.insert(readingProgress).values({
        userId,
        storyId: Number(storyId),
        progressPercentage: progressPercentage || 0,
        completed: completed || false,
      });
    }

    // Check achievement rules if story completed
    if (completed) {
      const allCompleted = await db
        .select()
        .from(readingProgress)
        .where(and(eq(readingProgress.userId, userId), eq(readingProgress.completed, true)));

      // First story achievement
      if (allCompleted.length >= 1) {
        const checkAch = await db
          .select()
          .from(userAchievements)
          .where(and(eq(userAchievements.userId, userId), eq(userAchievements.achievementKey, "first_story")));
        if (checkAch.length === 0) {
          await db.insert(userAchievements).values({ userId, achievementKey: "first_story" });
        }
      }

      // 10 stories achievement
      if (allCompleted.length >= 10) {
        const checkAch10 = await db
          .select()
          .from(userAchievements)
          .where(and(eq(userAchievements.userId, userId), eq(userAchievements.achievementKey, "10_stories")));
        if (checkAch10.length === 0) {
          await db.insert(userAchievements).values({ userId, achievementKey: "10_stories" });
        }
      }
    }

    return NextResponse.json({ success: true, message: "Progreso guardado" });
  } catch (error: any) {
    console.error("POST /api/progress error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
