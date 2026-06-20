import { Aaron } from "@freesewing/aaron";
import type { Measurements } from "./types";

/**
 * FreeSewing 的 Aaron 款式實際只需要三個 measurement：hips、neck、hpsToWaistBack
 * （單位都是公釐 mm）。我們的表單收 5 個對使用者友善的尺寸（公分 cm），
 * 這裡把它們對應/估算成 Aaron 需要的值。
 *
 * neck、hpsToWaistBack 在第一版用合理的人體比例估算 —— 這是 playground，
 * 不是精密打版，之後要更準可以再加欄位。
 */
function toAaronMeasurements(m: Measurements) {
  const cmToMm = (cm: number) => cm * 10;
  return {
    hips: cmToMm(m.hips),
    // 頸圍 ≈ 胸圍的 0.38（粗估）
    neck: cmToMm(m.chest * 0.38),
    // 後頸到腰長 ≈ 身高的 0.25（粗估）
    hpsToWaistBack: cmToMm(m.height * 0.25),
  };
}

export function generatePatternSvg(m: Measurements): string {
  const pattern = new Aaron({
    measurements: toAaronMeasurements(m),
  });
  return pattern.draft().render();
}
