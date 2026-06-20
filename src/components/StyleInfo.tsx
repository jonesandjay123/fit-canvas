"use client";

import { MEASUREMENT_LABELS } from "@/lib/types";
import {
  CATEGORY_LABELS,
  type PatternMeta,
} from "@/lib/patterns/catalog";

export default function StyleInfo({ pattern }: { pattern: PatternMeta }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">{pattern.label}</span>
        <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          {CATEGORY_LABELS[pattern.category]}
        </span>
      </div>

      <p className="text-neutral-500">{pattern.description}</p>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-neutral-400">主要用到尺寸：</span>
        {pattern.usedFields.map((f) => (
          <span
            key={f}
            className="rounded-md bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            {MEASUREMENT_LABELS[f]}
          </span>
        ))}
      </div>

      <p className="text-xs text-neutral-400">
        FreeSewing 需要 {pattern.freesewingMeasurements.length} 個細部尺寸，
        其餘由身高 / 胸圍比例估算。
      </p>

      <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
        ⚠️ {pattern.limitation}
      </p>
    </div>
  );
}
