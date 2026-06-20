"use client";

interface Props {
  svg: string | null;
  loading: boolean;
  error: string | null;
}

export default function PatternPreview({ svg, loading, error }: Props) {
  return (
    <div className="relative flex min-h-[320px] items-center justify-center rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800">
      {loading && (
        <span className="absolute right-3 top-3 text-xs text-neutral-400">
          生成中…
        </span>
      )}
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : svg ? (
        <div
          className="fs-pattern w-full max-w-full [&_svg]:h-auto [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p className="text-sm text-neutral-400">輸入尺寸以生成 2D 紙樣</p>
      )}
    </div>
  );
}
