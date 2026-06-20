"use client";

import type { Measurements, StyleId } from "@/lib/types";
import { STYLES } from "@/lib/types";
import NumberField from "./NumberField";

interface Props {
  name: string;
  onNameChange: (v: string) => void;
  style: StyleId;
  onStyleChange: (v: StyleId) => void;
  measurements: Measurements;
  onMeasurementsChange: (m: Measurements) => void;
}

const FIELDS: { key: keyof Measurements; label: string }[] = [
  { key: "chest", label: "胸圍" },
  { key: "waist", label: "腰圍" },
  { key: "hips", label: "臀圍" },
  { key: "height", label: "身高" },
  { key: "shoulder", label: "肩寬" },
];

export default function MeasurementForm({
  name,
  onNameChange,
  style,
  onStyleChange,
  measurements,
  onMeasurementsChange,
}: Props) {
  const set = (key: keyof Measurements, value: number) =>
    onMeasurementsChange({ ...measurements, [key]: value });

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
          設計名稱
        </span>
        <input
          type="text"
          value={name}
          placeholder="例如：夏季基本款 T"
          onChange={(e) => onNameChange(e.target.value)}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-200"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
          款式
        </span>
        <select
          value={style}
          onChange={(e) => onStyleChange(e.target.value as StyleId)}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-200"
        >
          {STYLES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <NumberField
            key={f.key}
            label={f.label}
            value={measurements[f.key]}
            onChange={(v) => set(f.key, v)}
          />
        ))}
      </div>
    </div>
  );
}
