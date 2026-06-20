import type { MeasurementField } from "../types";

/**
 * 純 metadata 的款式型錄 —— 不 import 任何 FreeSewing 套件，
 * 因此可以安全地在 client component 使用（不會把 FreeSewing 打包進前端）。
 * 真正的 draft 邏輯在 server-only 的 ./draft.ts。
 */

export type StyleId = "aaron" | "teagan" | "sven" | "waralee" | "trayvon";

export type PatternCategory =
  | "tops"
  | "bottoms"
  | "accessories"
  | "experimental";

export const CATEGORY_LABELS: Record<PatternCategory, string> = {
  tops: "上身 Tops",
  bottoms: "下身 Bottoms",
  accessories: "配件 Accessories",
  experimental: "實驗 Experimental",
};

export interface PatternMeta {
  id: StyleId;
  label: string;
  category: PatternCategory;
  /** 對應的 FreeSewing 套件名稱（給人看 / 文件用） */
  packageName: string;
  description: string;
  /** 此款式真正會明顯受影響的友善尺寸欄位（用來在 UI 標示「這款用到哪些尺寸」） */
  usedFields: MeasurementField[];
  /** FreeSewing 實際需要的細部 measurements（大多由友善尺寸估算而來） */
  freesewingMeasurements: string[];
  /** 誠實標示限制 / 估算的部分 */
  limitation: string;
}

export const CATALOG: PatternMeta[] = [
  {
    id: "aaron",
    label: "Aaron 無袖背心",
    category: "tops",
    packageName: "@freesewing/aaron",
    description: "經典無袖背心（A-shirt / tank top），最適合入門展示版型生成。",
    usedFields: ["chest", "hips", "height"],
    freesewingMeasurements: [
      "biceps",
      "chest",
      "hips",
      "hpsToBust",
      "hpsToWaistBack",
      "neck",
      "shoulderSlope",
      "shoulderToShoulder",
      "waistToArmpit",
      "waistToHips",
    ],
    limitation:
      "肩斜、頸圍、各縱向長度由身高與胸圍比例估算，非精密量身。",
  },
  {
    id: "teagan",
    label: "Teagan T-shirt",
    category: "tops",
    packageName: "@freesewing/teagan",
    description: "有袖的合身 T-shirt，比 Aaron 多了袖子與腰線。",
    usedFields: ["chest", "waist", "hips", "height", "shoulder"],
    freesewingMeasurements: [
      "biceps",
      "chest",
      "hips",
      "hpsToBust",
      "hpsToWaistBack",
      "neck",
      "shoulderSlope",
      "shoulderToShoulder",
      "shoulderToWrist",
      "waist",
      "waistToArmpit",
      "waistToHips",
      "wrist",
    ],
    limitation: "袖長、手腕圍、肩斜等以身高/胸圍比例估算。",
  },
  {
    id: "sven",
    label: "Sven 基本毛衣",
    category: "tops",
    packageName: "@freesewing/sven",
    description: "寬鬆的基本毛衣 / 上衣 block，適合針織或梭織。",
    usedFields: ["chest", "waist", "hips", "height", "shoulder"],
    freesewingMeasurements: [
      "biceps",
      "chest",
      "hips",
      "hpsToBust",
      "hpsToWaistBack",
      "neck",
      "shoulderSlope",
      "shoulderToShoulder",
      "shoulderToWrist",
      "waist",
      "waistToArmpit",
      "waistToHips",
      "wrist",
    ],
    limitation: "袖長與縱向長度以身高比例估算。",
  },
  {
    id: "waralee",
    label: "Waralee 綁帶寬褲",
    category: "bottoms",
    packageName: "@freesewing/waralee",
    description: "泰式綁帶寬褲（wrap pants），結構簡單、容錯高，是少數穩定的下身款式。",
    usedFields: ["waist", "hips", "height"],
    freesewingMeasurements: [
      "crotchDepth",
      "inseam",
      "seat",
      "waistToHips",
    ],
    limitation: "股上深度（crotchDepth）與內側褲長（inseam）由身高估算。",
  },
  {
    id: "trayvon",
    label: "Trayvon 領帶",
    category: "accessories",
    packageName: "@freesewing/trayvon",
    description: "經典領帶。與體型關聯極小，主要用來展示參數化生成本身。",
    usedFields: ["height"],
    freesewingMeasurements: ["hpsToWaistBack", "neck", "waistToHips"],
    limitation: "領帶尺寸幾乎與身體無關，這裡僅作參數化生成示範。",
  },
];

export function getPattern(id: string): PatternMeta | undefined {
  return CATALOG.find((p) => p.id === id);
}

export function patternsByCategory(): [PatternCategory, PatternMeta[]][] {
  const order: PatternCategory[] = [
    "tops",
    "bottoms",
    "accessories",
    "experimental",
  ];
  return order
    .map((cat) => [cat, CATALOG.filter((p) => p.category === cat)] as [
      PatternCategory,
      PatternMeta[],
    ])
    .filter(([, list]) => list.length > 0);
}
