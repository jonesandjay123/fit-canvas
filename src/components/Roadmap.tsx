"use client";

const ITEMS: { title: string; desc: string }[] = [
  {
    title: "AI 試穿 preview",
    desc: "接 CatVTON / IDM-VTON，把設計卡套到人物照上做視覺預覽。",
  },
  {
    title: "更多 FreeSewing 款式",
    desc: "擴充更多 tops / bottoms / accessories 版型到型錄。",
  },
  {
    title: "畫布標註",
    desc: "用 Fabric.js / Konva.js 在紙樣上拖拉、標註、貼布料圖。",
  },
  {
    title: "雲端同步",
    desc: "用 Supabase / Firebase 取代 localStorage，跨裝置保存設計卡。",
  },
];

export default function Roadmap() {
  return (
    <section className="mt-12 rounded-2xl border border-dashed border-neutral-300 p-6 dark:border-neutral-700">
      <div className="mb-1 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-neutral-500">
          Roadmap / 未來方向
        </h2>
        <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-neutral-800">
          placeholder · 尚未實作
        </span>
      </div>
      <p className="mb-4 text-xs text-neutral-400">
        目前階段只做「多款式 2D pattern playground + 設計卡」，以下為規劃中的功能。
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it) => (
          <div
            key={it.title}
            className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 opacity-80 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="text-sm font-medium">{it.title}</p>
            <p className="mt-1 text-xs text-neutral-500">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
