import { useSyncExternalStore } from "react";
import type { DesignCard } from "./types";

const KEY = "fit-canvas:cards";
const EMPTY: DesignCard[] = [];

// 快取的快照，確保 getSnapshot 在未變動時回傳穩定的參考。
let cache: DesignCard[] | null = null;
const listeners = new Set<() => void>();

function read(): DesignCard[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DesignCard[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): DesignCard[] {
  if (cache === null) cache = read();
  return cache;
}

function getServerSnapshot(): DesignCard[] {
  return EMPTY;
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** 更新設計卡：寫入 localStorage 並通知所有訂閱者。 */
export function setStoredCards(next: DesignCard[]): void {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

/** React hook：訂閱 localStorage 裡的設計卡（SSR 安全、無 hydration mismatch）。 */
export function useDesignCards(): DesignCard[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
