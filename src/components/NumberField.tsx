"use client";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  /** 是否為目前款式主要用到的尺寸 */
  primary?: boolean;
}

export default function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 300,
  unit = "cm",
  primary = false,
}: Props) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-300">
        {label}
        <span className="text-xs text-neutral-400">({unit})</span>
        {primary && (
          <span className="ml-auto rounded bg-neutral-900 px-1.5 text-[10px] font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">
            主要
          </span>
        )}
      </span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 dark:bg-neutral-900 dark:focus:border-neutral-200 ${
          primary
            ? "border-neutral-400 dark:border-neutral-600"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
      />
    </label>
  );
}
