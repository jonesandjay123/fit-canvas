# fit-canvas

多款式服裝版型 playground。流程：**量身 → 選款式 → 生成 2D 紙樣 → 上傳布料/色票 → 匯出設計卡**。

定位：*A web app for experimenting with body measurements, parametric sewing patterns, and visual garment previews.*
**不是 CLO 3D 替代品** —— 核心不做 3D 布料物理，而是用 [FreeSewing](https://freesewing.org) 依身體尺寸生成參數化 2D SVG 紙樣。

## 技術

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4**
- **FreeSewing**（多個 design 套件）—— 在 `/api/pattern` server route 生成紙樣
- **html-to-image** —— 設計卡匯出 PNG
- 設計卡以 `useSyncExternalStore` 存在瀏覽器 `localStorage`

## 架構

| 檔案 | 角色 |
|---|---|
| `src/lib/patterns/catalog.ts` | **純 metadata 型錄**（款式、分類、描述、限制、所需尺寸）。不 import FreeSewing，可在 client 用。 |
| `src/lib/patterns/draft.ts` | **server-only**：style → FreeSewing design → SVG。只被 API route 匯入，FreeSewing 不進前端 bundle。 |
| `src/lib/measurements.ts` | 把 5 個友善尺寸（cm）估算成 FreeSewing 需要的整套 measurements（mm）。 |
| `src/app/api/pattern/route.ts` | 接收 `{ style, measurements }`，回傳 `{ svg }`。 |

要新增款式：在 `catalog.ts` 加一筆 `PatternMeta`、在 `draft.ts` 的 `DESIGNS` 註冊對應 design class，並安裝該 `@freesewing/*` 套件（版本需與 `core` 一致，目前 4.9.0）。

## 目前支援的款式

| 款式 | 分類 | 套件 | 主要用到尺寸 |
|---|---|---|---|
| Aaron 無袖背心 | tops | `@freesewing/aaron` | 胸圍、臀圍、身高 |
| Teagan T-shirt | tops | `@freesewing/teagan` | 胸/腰/臀/身高/肩寬 |
| Sven 基本毛衣 | tops | `@freesewing/sven` | 胸/腰/臀/身高/肩寬 |
| Waralee 綁帶寬褲 | bottoms | `@freesewing/waralee` | 腰圍、臀圍、身高 |
| Trayvon 領帶 | accessories | `@freesewing/trayvon` | （與體型關聯極小） |

## 尺寸估算（重要 / 誠實標示）

表單只收 **5 個友善尺寸**（胸圍 / 腰圍 / 臀圍 / 身高 / 肩寬，單位 cm），
但 FreeSewing 款式動輒需要 10+ 個細部 measurements。
因此 `estimateBody()` 用**人體比例**把這 5 個尺寸估算成整套 measurements：

- 圍度 / 寬度：直接用輸入，或由胸圍推估（頸圍、上臂、手腕…）
- 縱向長度：依身高等比縮放（後腰長、袖長、股上、內側褲長…）

這是 **playground 等級的估算，不是精密打版**。UI 上每個款式都會標示「主要用到哪些尺寸」與該款的估算限制（見每個款式的 ⚠️ 說明）。

## 開發

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
```

> 註：使用 pnpm；`pnpm-workspace.yaml` 已允許 `sharp` 的 build script，否則 Next 16 的 deps 檢查會失敗。

## 功能

- 多款式選擇（依分類分組的 cards）+ 款式資訊面板（分類 / 描述 / 用到尺寸 / 限制）
- 5 個量身欄位，輸入即時防抖生成紙樣
- 布料/靈感圖上傳、色票、設計 notes
- 設計卡：含款式快照（label/category/description），儲存到 localStorage、列表、刪除、匯出 PNG

## Roadmap（尚未實作）

- AI 試穿 preview（CatVTON / IDM-VTON）
- 更多 FreeSewing 款式
- Fabric.js / Konva.js 畫布標註
- Supabase / Firebase 雲端同步
