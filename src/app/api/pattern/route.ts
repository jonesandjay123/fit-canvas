import { NextRequest, NextResponse } from "next/server";
import { generatePatternSvg } from "@/lib/patterns/draft";
import type { Measurements } from "@/lib/types";

export const runtime = "nodejs";

interface PatternRequest {
  style: string;
  measurements: Measurements;
}

export async function POST(req: NextRequest) {
  try {
    const { style, measurements } = (await req.json()) as PatternRequest;
    const svg = generatePatternSvg(style, measurements);
    return NextResponse.json({ svg });
  } catch (err) {
    console.error("pattern draft failed:", err);
    const message =
      err instanceof Error ? err.message : "無法生成紙樣，請檢查款式與尺寸。";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
