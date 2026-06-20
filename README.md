# fit-canvas

服裝設計小工作台（playground）。流程：**量身 → 選款式 → 生成 2D 紙樣 → 上傳布料/色票 → 匯出設計卡**。

核心不做完整 3D 布料物理，而是用 [FreeSewing](https://freesewing.org) 依身體尺寸生成參數化 SVG 紙樣 —— 真的碰到「尺寸 → 版型 → 款式卡」的設計流程。

## 技術

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4**
- **FreeSewing**（`@freesewing/core` + `@freesewing/aaron` T-shirt 款式）—— 在 `/api/pattern` server route 生成紙樣
- **html-to-image** —— 設計卡匯出 PNG
- 設計卡儲存在瀏覽器 `localStorage`

## 開發

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
```

## 目前功能（第一版）

- 5 個量身欄位（胸圍 / 腰圍 / 臀圍 / 身高 / 肩寬），輸入即時防抖生成紙樣
- T-shirt（FreeSewing Aaron）款式
- 布料/靈感圖上傳、色票、設計 notes
- 設計卡：儲存到 localStorage、列表、刪除、匯出 PNG

## 之後可加（roadmap）

- 更多款式（skirt / pants）
- Konva.js / Fabric.js 畫布拖拉標註、布料貼圖
- AI 試穿 preview（CatVTON / Replicate / Hugging Face API）
- 雲端儲存（Supabase / Firebase）

## 注意

FreeSewing 的 Aaron 款式實際只需要 `hips / neck / hpsToWaistBack` 三個 measurement，其餘由表單尺寸用人體比例估算（見 `src/lib/pattern.ts`）。這是 playground 等級的估算，不是精密打版。
