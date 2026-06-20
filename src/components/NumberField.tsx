"use client";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

export default function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 300,
  unit = "cm",
}: Props) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
        {label}
        <span className="ml-1 text-xs text-neutral-400">({unit})</span>
      </span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-200"
      />
    </label>
  );
}
