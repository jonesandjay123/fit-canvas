import type { StyleId, PatternCategory } from "./patterns/catalog";

// 使用者輸入的量身資料（單位：公分 cm，介面對使用者友善）。
// 這是「友善尺寸」，每個款式會再把它估算成 FreeSewing 需要的細部 measurements。
export interface Measurements {
  chest: number; // 胸圍
  waist: number; // 腰圍
  hips: number; // 臀圍
  height: number; // 身高
  shoulder: number; // 肩寬
}

export type MeasurementField = keyof Measurements;

export const MEASUREMENT_LABELS: Record<MeasurementField, string> = {
  chest: "胸圍",
  waist: "腰圍",
  hips: "臀圍",
  height: "身高",
  shoulder: "肩寬",
};

// 一張「設計卡」：完整描述一個設計概念。
// style 相關欄位會在儲存當下做快照，讓卡片即使日後款式調整也能正確顯示。
export interface DesignCard {
  id: string;
  name: string;
  style: StyleId;
  styleLabel: string;
  styleCategory: PatternCategory;
  styleDescription: string;
  measurements: Measurements;
  /** 布料 / 靈感圖（dataURL，存在 localStorage） */
  fabricImage: string | null;
  /** 色票 */
  swatches: string[];
  notes: string;
  /** draft 出來的 SVG 紙樣（快取，方便重新渲染卡片） */
  patternSvg: string | null;
  createdAt: number;
}

export const DEFAULT_MEASUREMENTS: Measurements = {
  chest: 96,
  waist: 80,
  hips: 100,
  height: 170,
  shoulder: 45,
};
