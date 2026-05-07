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

const DATA_PATH = path.resolve(process.cwd(), "src/data/realizace.json");

function readAll(): RealizaceItem[] {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const data = JSON.parse(raw) as RealizaceItem[];
  return Array.isArray(data) ? data : [];
}

function writeAll(items: RealizaceItem[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2) + "\n", "utf8");
}

export function listRealizace({ includeUnpublished = false } = {}) {
  const items = readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return includeUnpublished ? items : items.filter((x) => x.published);
}

export function createRealizace(input: {
  title: string;
  description: string;
  imageUrl: string;
  published: boolean;
}) {
  const items = readAll();
  const id = `r_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
  const item: RealizaceItem = {
    id,
    createdAt: new Date().toISOString(),
    title: input.title,
    description: input.description,
    imageUrl: input.imageUrl,
    published: input.published,
  };
  items.push(item);
  writeAll(items);
  return item;
}
