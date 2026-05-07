import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "node:path";
import fs from "node:fs";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";
import { createRealizace } from "@/lib/realizaceStore";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) {
    return NextResponse.redirect(new URL("/admin/prihlaseni", req.url));
  }

  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const published = String(form.get("published") || "") === "1";
  const file = form.get("image");

  if (!title || !description || !(file instanceof File)) {
    return NextResponse.redirect(new URL("/admin/realizace/nova?err=1", req.url));
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (() => {
    const t = file.type || "";
    if (t === "image/png") return "png";
    if (t === "image/webp") return "webp";
    return "jpg";
  })();

  // Create record first to get id
  const tmp = createRealizace({ title, description, imageUrl: "", published });

  const uploadsDir = path.resolve(process.cwd(), "public/uploads/realizace");
  fs.mkdirSync(uploadsDir, { recursive: true });

  const filename = `${tmp.id}.${ext}`;
  const outPath = path.join(uploadsDir, filename);
  fs.writeFileSync(outPath, bytes);

  // rewrite with imageUrl (simple approach: edit JSON)
  const dataPath = path.resolve(process.cwd(), "src/data/realizace.json");
  const all = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const idx = Array.isArray(all) ? all.findIndex((x: any) => x?.id === tmp.id) : -1;
  if (idx >= 0) {
    all[idx].imageUrl = `/uploads/realizace/${filename}`;
    fs.writeFileSync(dataPath, JSON.stringify(all, null, 2) + "\n", "utf8");
  }

  return NextResponse.redirect(new URL("/admin/realizace", req.url));
}
