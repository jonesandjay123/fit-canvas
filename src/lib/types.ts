// 使用者輸入的量身資料（單位：公分 cm，介面對使用者友善）
export interface Measurements {
  chest: number; // 胸圍
  waist: number; // 腰圍
  hips: number; // 臀圍
  height: number; // 身高
  shoulder: number; // 肩寬
}

// 目前第一版只支援一種款式
export type StyleId = "tshirt";

export const STYLES: { id: StyleId; label: string }[] = [
  { id: "tshirt", label: "T-shirt / 背心 (Aaron)" },
];

// 一張「設計卡」：完整描述一個設計概念
export interface DesignCard {
  id: string;
  name: string;
  style: StyleId;
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
