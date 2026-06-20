"use client";

import type { StyleId } from "@/lib/patterns/catalog";
import { CATEGORY_LABELS, patternsByCategory } from "@/lib/patterns/catalog";

interface Props {
  value: StyleId;
  onChange: (id: StyleId) => void;
}

export default function StylePicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {patternsByCategory().map(([category, patterns]) => (
        <div key={category} className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {CATEGORY_LABELS[category]}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {patterns.map((p) => {
              const selected = p.id === value;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChange(p.id)}
                  className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                      : "border-neutral-200 bg-white hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900"
                  }`}
                >
                  <span className="text-sm font-semibold">{p.label}</span>
                  <span
                    className={`text-xs ${
                      selected
                        ? "text-neutral-300 dark:text-neutral-600"
                        : "text-neutral-500"
                    }`}
                  >
                    {p.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
