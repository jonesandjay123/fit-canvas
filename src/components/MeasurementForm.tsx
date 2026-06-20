"use client";

import type { Measurements, MeasurementField } from "@/lib/types";
import { MEASUREMENT_LABELS } from "@/lib/types";
import NumberField from "./NumberField";

interface Props {
  name: string;
  onNameChange: (v: string) => void;
  measurements: Measurements;
  onMeasurementsChange: (m: Measurements) => void;
  /** 此款式主要用到的尺寸欄位，會加上標記 */
  highlightFields: MeasurementField[];
}

const FIELDS: MeasurementField[] = [
  "chest",
  "waist",
  "hips",
  "height",
  "shoulder",
];

export default function MeasurementForm({
  name,
  onNameChange,
  measurements,
  onMeasurementsChange,
  highlightFields,
}: Props) {
  const set = (key: MeasurementField, value: number) =>
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

      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <NumberField
            key={f}
            label={MEASUREMENT_LABELS[f]}
            primary={highlightFields.includes(f)}
            value={measurements[f]}
            onChange={(v) => set(f, v)}
          />
        ))}
      </div>
    </div>
  );
}
