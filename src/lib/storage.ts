import type { DesignCard } from "./types";

const KEY = "fit-canvas:cards";

export function loadCards(): DesignCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DesignCard[]) : [];
  } catch {
    return [];
  }
}

export function saveCards(cards: DesignCard[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(cards));
}
