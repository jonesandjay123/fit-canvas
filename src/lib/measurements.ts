import type { Measurements } from "./types";

/**
 * 把 5 個友善尺寸（公分）估算成 FreeSewing 需要的整套 measurements（公釐）。
 *
 * FreeSewing 的款式動輒需要 10+ 個細部 measurements，而我們的表單只收 5 個，
 * 所以這裡用人體比例做估算。這是 playground 等級的估算，不是精密打版 ——
 * 每個款式會在 UI 標示哪些尺寸是估算的（見 catalog 的 limitation）。
 *
 * 基準值以身高約 170cm 的成人為準，縱向長度依實際身高等比縮放，
 * 圍度 / 寬度則直接用使用者輸入或由胸圍推估。
 */

const BASE_HEIGHT_MM = 1700;

// 縱向（會隨身高縮放）的基準值，單位 mm
const VERTICAL_BASE = {
  hpsToBust: 280,
  hpsToWaistBack: 440,
  shoulderToWrist: 620,
  waistToArmpit: 230,
  waistToHips: 130,
  crotchDepth: 280,
  inseam: 760,
  waistBack: 460,
};

const round = (n: number) => Math.round(n);

export type BodyMeasurements = Record<string, number>;

export function estimateBody(m: Measurements): BodyMeasurements {
  const heightMm = m.height * 10;
  const s = heightMm / BASE_HEIGHT_MM; // 身高縮放係數
  const chest = m.chest * 10;
  const waist = m.waist * 10;
  const hips = m.hips * 10;

  return {
    // 圍度 / 寬度：直接用輸入或由胸圍推估
    chest,
    highBust: Math.max(chest - 80, 0),
    waist,
    hips,
    seat: hips, // FreeSewing 下身用 seat，近似等於臀圍
    neck: round(chest * 0.37),
    biceps: round(chest * 0.34),
    wrist: round(chest * 0.18),
    shoulderToShoulder: m.shoulder * 10,
    shoulderSlope: 50, // 肩斜（mm），用常見值

    // 縱向：依身高縮放
    hpsToBust: round(VERTICAL_BASE.hpsToBust * s),
    hpsToWaistBack: round(VERTICAL_BASE.hpsToWaistBack * s),
    shoulderToWrist: round(VERTICAL_BASE.shoulderToWrist * s),
    waistToArmpit: round(VERTICAL_BASE.waistToArmpit * s),
    waistToHips: round(VERTICAL_BASE.waistToHips * s),
    crotchDepth: round(VERTICAL_BASE.crotchDepth * s),
    inseam: round(VERTICAL_BASE.inseam * s),
    waistBack: round(VERTICAL_BASE.waistBack * s),
  };
}

/** 從整套估算的 body 中，挑出某款式真正需要的 measurements。 */
export function pickMeasurements(
  body: BodyMeasurements,
  keys: string[],
): BodyMeasurements {
  const out: BodyMeasurements = {};
  for (const k of keys) {
    if (body[k] !== undefined) out[k] = body[k];
  }
  return out;
}
