"use client";

import { forwardRef } from "react";
import type { DesignCard } from "@/lib/types";
import { STYLES } from "@/lib/types";

const LABELS: Record<string, string> = {
  chest: "胸圍",
  waist: "腰圍",
  hips: "臀圍",
  height: "身高",
  shoulder: "肩寬",
};

interface Props {
  card: DesignCard;
}

/** 一張可匯出成 PNG 的設計卡（presentation board）。 */
const DesignCardView = forwardRef<HTMLDivElement, Props>(function DesignCardView(
  { card },
  ref,
) {
  const styleLabel = STYLES.find((s) => s.id === card.style)?.label ?? card.style;

  return (
    <div
      ref={ref}
      className="w-full rounded-xl border border-neutral-200 bg-white p-5 text-neutral-900 dark:border-neutral-800"
    >
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">{card.name || "未命名設計"}</h3>
        <span className="text-xs text-neutral-400">{styleLabel}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 左：布料圖 + 紙樣縮圖 */}
        <div className="flex flex-col gap-3">
          {card.fabricImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.fabricImage}
              alt="fabric"
              className="h-32 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-lg bg-neutral-100 text-xs text-neutral-400">
              無布料圖
            </div>
          )}
          {card.patternSvg && (
            <div
              className="h-32 w-full overflow-hidden rounded-lg bg-neutral-50 p-2 [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: card.patternSvg }}
            />
          )}
        </div>

        {/* 右：尺寸 + 色票 + notes */}
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
              尺寸 (cm)
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              {Object.entries(card.measurements).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="text-neutral-500">{LABELS[k] ?? k}</span>
                  <span className="font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {card.swatches.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                色票
              </p>
              <div className="flex gap-1.5">
                {card.swatches.map((c, i) => (
                  <span
                    key={i}
                    className="h-6 w-6 rounded-full border border-neutral-200"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          {card.notes && (
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Notes
              </p>
              <p className="whitespace-pre-wrap text-neutral-600">{card.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default DesignCardView;
