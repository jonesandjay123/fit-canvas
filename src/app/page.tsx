"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { DesignCard, Measurements, StyleId } from "@/lib/types";
import { DEFAULT_MEASUREMENTS } from "@/lib/types";
import { loadCards, saveCards } from "@/lib/storage";
import MeasurementForm from "@/components/MeasurementForm";
import PatternPreview from "@/components/PatternPreview";
import DesignCardView from "@/components/DesignCardView";

export default function Home() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState<StyleId>("tshirt");
  const [measurements, setMeasurements] =
    useState<Measurements>(DEFAULT_MEASUREMENTS);
  const [fabricImage, setFabricImage] = useState<string | null>(null);
  const [swatches, setSwatches] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [newColor, setNewColor] = useState("#1e293b");

  const [svg, setSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cards, setCards] = useState<DesignCard[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  // 載入已存的設計卡
  useEffect(() => {
    setCards(loadCards());
  }, []);

  // 尺寸變動 → 防抖後重新生成紙樣
  useEffect(() => {
    const id = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/pattern", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(measurements),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "生成失敗");
        setSvg(data.svg);
      } catch (e) {
        setError(e instanceof Error ? e.message : "生成失敗");
        setSvg(null);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(id);
  }, [measurements]);

  const onFabric = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFabricImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const currentCard: DesignCard = {
    id: "preview",
    name,
    style,
    measurements,
    fabricImage,
    swatches,
    notes,
    patternSvg: svg,
    createdAt: Date.now(),
  };

  const persist = (next: DesignCard[]) => {
    setCards(next);
    saveCards(next);
  };

  const handleSave = () => {
    const card: DesignCard = { ...currentCard, id: crypto.randomUUID() };
    persist([card, ...cards]);
  };

  const handleDelete = (id: string) =>
    persist(cards.filter((c) => c.id !== id));

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${name || "design-card"}.png`;
    a.click();
  }, [name]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">fit-canvas</h1>
        <p className="mt-1 text-sm text-neutral-500">
          服裝設計小工作台 · 量身 → 款式 → 2D 紙樣 → 設計卡
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        {/* 左欄：輸入 */}
        <section className="flex flex-col gap-6">
          <MeasurementForm
            name={name}
            onNameChange={setName}
            style={style}
            onStyleChange={setStyle}
            measurements={measurements}
            onMeasurementsChange={setMeasurements}
          />

          {/* 布料圖 */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              布料 / 靈感圖
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={onFabric}
              className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-white dark:file:bg-neutral-200 dark:file:text-neutral-900"
            />
          </div>

          {/* 色票 */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              色票
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-neutral-300"
              />
              <button
                onClick={() => setSwatches([...swatches, newColor])}
                className="rounded-lg bg-neutral-200 px-3 py-1.5 text-sm font-medium dark:bg-neutral-800"
              >
                加入色票
              </button>
              <div className="flex flex-wrap gap-1.5">
                {swatches.map((c, i) => (
                  <button
                    key={i}
                    title="點擊移除"
                    onClick={() =>
                      setSwatches(swatches.filter((_, j) => j !== i))
                    }
                    className="h-7 w-7 rounded-full border border-neutral-300"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* notes */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Notes
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="設計想法、版型備註…"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-200"
            />
          </label>
        </section>

        {/* 右欄：預覽 + 設計卡 */}
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-neutral-500">
              2D 紙樣預覽
            </h2>
            <PatternPreview svg={svg} loading={loading} error={error} />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-500">設計卡</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium dark:border-neutral-700"
                >
                  匯出 PNG
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                >
                  儲存
                </button>
              </div>
            </div>
            <DesignCardView ref={cardRef} card={currentCard} />
          </div>
        </section>
      </div>

      {/* 已儲存的設計卡 */}
      {cards.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold text-neutral-500">
            已儲存設計卡（{cards.length}）
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <div key={card.id} className="relative">
                <DesignCardView card={card} />
                <button
                  onClick={() => handleDelete(card.id)}
                  className="absolute right-3 top-3 rounded-md bg-red-500/90 px-2 py-0.5 text-xs font-medium text-white"
                >
                  刪除
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
