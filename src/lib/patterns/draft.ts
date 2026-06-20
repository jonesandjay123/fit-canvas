import { Aaron } from "@freesewing/aaron";
import { Teagan } from "@freesewing/teagan";
import { Sven } from "@freesewing/sven";
import { Waralee } from "@freesewing/waralee";
import { Trayvon } from "@freesewing/trayvon";
import type { Measurements } from "../types";
import { estimateBody, pickMeasurements } from "../measurements";
import { getPattern, type StyleId } from "./catalog";

/**
 * server-only：把 style + 友善尺寸轉成 FreeSewing 紙樣 SVG。
 * 只會被 /api/pattern route 匯入，FreeSewing 不會進到前端 bundle。
 */

// FreeSewing design 的最小介面（draft → render）
interface FreeSewingDesign {
  new (settings?: Record<string, unknown>): {
    draft(): { render(): string };
  };
}

const DESIGNS: Record<StyleId, FreeSewingDesign> = {
  aaron: Aaron,
  teagan: Teagan,
  sven: Sven,
  waralee: Waralee,
  trayvon: Trayvon,
};

export function generatePatternSvg(style: string, m: Measurements): string {
  const meta = getPattern(style);
  const Design = DESIGNS[style as StyleId];
  if (!meta || !Design) {
    throw new Error(`未知的款式：${style}`);
  }
  const body = estimateBody(m);
  const measurements = pickMeasurements(body, meta.freesewingMeasurements);
  return new Design({ measurements }).draft().render();
}
