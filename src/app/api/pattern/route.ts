import { NextRequest, NextResponse } from "next/server";
import { generatePatternSvg } from "@/lib/pattern";
import type { Measurements } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const m = (await req.json()) as Measurements;
    const svg = generatePatternSvg(m);
    return NextResponse.json({ svg });
  } catch (err) {
    console.error("pattern draft failed:", err);
    return NextResponse.json(
      { error: "無法生成紙樣，請檢查尺寸數值。" },
      { status: 400 },
    );
  }
}
