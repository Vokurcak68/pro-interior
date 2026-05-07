import fs from "node:fs";
import path from "node:path";

export type RealizaceItem = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  imageUrl: string; // e.g. /uploads/realizace/<id>.jpg
  published: boolean;
};

export const REALIZACE_JSON_PATH = "src/data/realizace.json";
const DATA_PATH = path.resolve(process.cwd(), REALIZACE_JSON_PATH);

function readAll(): RealizaceItem[] {
  // Pozn.: Na Vercelu nemusí být k dispozici soubor `src/data/realizace.json` přes fs
  // (záleží na bundlingu / runtime). Proto zkusíme fallback přes import.
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    const data = JSON.parse(raw) as RealizaceItem[];
    return Array.isArray(data) ? data : [];
  } catch {
    // Fallback: načti JSON přes ESM import (funguje spolehlivě i po bundlingu)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("@/data/realizace.json");
    const data = (mod?.default ?? mod) as RealizaceItem[];
    return Array.isArray(data) ? data : [];
  }
}

export function listRealizace({ includeUnpublished = false } = {}) {
  const items = readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return includeUnpublished ? items : items.filter((x) => x.published);
}

export function createRealizaceDraft(input: {
  title: string;
  description: string;
  imageUrl: string;
  published: boolean;
}) {
  const id = `r_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
  const item: RealizaceItem = {
    id,
    createdAt: new Date().toISOString(),
    title: input.title,
    description: input.description,
    imageUrl: input.imageUrl,
    published: input.published,
  };
  return item;
}

export function upsertRealizaceLocal(item: RealizaceItem) {
  const items = readAll();
  const idx = items.findIndex((x) => x.id === item.id);
  if (idx >= 0) items[idx] = item;
  else items.push(item);
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2) + "\n", "utf8");
  return item;
}

export function deleteRealizaceLocal(id: string) {
  const items = readAll();
  const next = items.filter((x) => x.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(next, null, 2) + "\n", "utf8");
  return { deleted: items.find((x) => x.id === id) || null, items: next };
}

export function getRealizaceById(id: string) {
  const items = readAll();
  return items.find((x) => x.id === id) || null;
}
