import { NextResponse } from "next/server";
import { runSeed } from "@/db/seed";

export async function GET() {
  try {
    await runSeed();
    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
