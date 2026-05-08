import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "node:path";
import fs from "node:fs";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";
import { createRealizaceDraft, listRealizace, REALIZACE_JSON_PATH, upsertRealizaceLocal } from "@/lib/realizaceStore";
import { getRequiredEnv } from "@/lib/serverEnv";
import { githubGetFileSha, githubWriteFile } from "@/lib/githubRepoWriter";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) {
    return NextResponse.redirect(new URL("/admin/prihlaseni", req.url));
  }

  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const category = String(form.get("category") || "").trim();
  const location = String(form.get("location") || "").trim();
  const yearRaw = String(form.get("year") || "").trim();
  const year = Number.parseInt(yearRaw, 10);
  const published = String(form.get("published") || "") === "1";
  const file = form.get("image");

  if (!title || !description || !category || !location || !Number.isFinite(year) || !(file instanceof File)) {
    return NextResponse.redirect(new URL("/admin/realizace/nova?err=1", req.url));
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (() => {
    const t = file.type || "";
    if (t === "image/png") return "png";
    if (t === "image/webp") return "webp";
    return "jpg";
  })();

  // 1) vytvoř "draft" záznam s id
  const item = createRealizaceDraft({ title, description, category, location, year, imageUrl: "", published });

  // 2) ulož obrázek lokálně (dev) + připrav base64 pro GitHub (prod)
  const filename = `${item.id}.${ext}`;
  const publicImageUrl = `/uploads/realizace/${filename}`;
  item.imageUrl = publicImageUrl;

  // 3) LOCAL fallback (funguje lokálně; na Vercelu je filesystem read-only)
  if (!process.env.VERCEL) {
    const uploadsDir = path.resolve(process.cwd(), "public/uploads/realizace");
    fs.mkdirSync(uploadsDir, { recursive: true });
    fs.writeFileSync(path.join(uploadsDir, filename), bytes);

    upsertRealizaceLocal(item);
  }

  // 4) PRODUKCE: commitni změny do GitHub repa (json + obrázek), aby byly trvalé
  try {
    const ghToken = getRequiredEnv("PI_GITHUB_TOKEN");
    const owner = getRequiredEnv("PI_GITHUB_OWNER");
    const repo = getRequiredEnv("PI_GITHUB_REPO");
    const branch = getRequiredEnv("PI_GITHUB_BRANCH");

    // a) JSON: vezmi aktuální publikované položky + přidej novou (bez čtení z disku je to tricky)
    //    Nejjednodušší: vygeneruj nový JSON z listRealizace(includeUnpublished=true) + item
    const existing = listRealizace({ includeUnpublished: true });
    const merged = [item, ...existing.filter((x) => x.id !== item.id)];
    const json = JSON.stringify(merged, null, 2) + "\n";

    const sha = await githubGetFileSha({ token: ghToken, owner, repo, branch, path: REALIZACE_JSON_PATH });
    await githubWriteFile({
      token: ghToken,
      owner,
      repo,
      branch,
      path: REALIZACE_JSON_PATH,
      sha,
      contentBase64: Buffer.from(json, "utf8").toString("base64"),
      message: `Add realizace: ${title}`,
    });

    // b) image
    const imageRepoPath = `public/uploads/realizace/${filename}`;
    // image might not exist yet in repo
    let imageSha: string | undefined = undefined;
    try {
      imageSha = await githubGetFileSha({ token: ghToken, owner, repo, branch, path: imageRepoPath });
    } catch {
      // ignore (new file)
    }

    await githubWriteFile({
      token: ghToken,
      owner,
      repo,
      branch,
      path: imageRepoPath,
      sha: imageSha,
      contentBase64: bytes.toString("base64"),
      message: `Add realizace image: ${title}`,
    });
  } catch {
    // pokud GH zápis nevyjde, aspoň lokální zápis zůstane
  }

  return NextResponse.redirect(new URL("/admin/realizace", req.url), 303);
}
