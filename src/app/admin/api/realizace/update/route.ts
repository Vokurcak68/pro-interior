import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "node:path";
import fs from "node:fs";

import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";
import { getRealizaceById, listRealizace, REALIZACE_JSON_PATH, upsertRealizaceLocal, type RealizaceItem } from "@/lib/realizaceStore";
import { getRequiredEnv } from "@/lib/serverEnv";
import { githubDeleteFile, githubGetFileSha, githubWriteFile } from "@/lib/githubRepoWriter";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) {
    return NextResponse.redirect(new URL("/admin/prihlaseni", req.url), 303);
  }

  const form = await req.formData();
  const id = String(form.get("id") || "").trim();
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const category = String(form.get("category") || "").trim();
  const location = String(form.get("location") || "").trim();
  const yearRaw = String(form.get("year") || "").trim();
  const year = Number.parseInt(yearRaw, 10);
  const published = String(form.get("published") || "") === "1";
  const file = form.get("image");

  if (!id || !title || !description || !category || !location || !Number.isFinite(year)) {
    return NextResponse.redirect(new URL(`/admin/realizace/${encodeURIComponent(id || "")}?err=1`, req.url), 303);
  }

  const existing = getRealizaceById(id);
  if (!existing) {
    return NextResponse.redirect(new URL("/admin/realizace?err=notfound", req.url), 303);
  }

  const next: RealizaceItem = {
    ...existing,
    title,
    description,
    category,
    location,
    year,
    published,
  };

  let newImageBytes: Buffer | null = null;
  let newImageRepoPath: string | null = null;
  let oldImageRepoPathToDelete: string | null = null;

  if (file instanceof File && file.size > 0) {
    const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 MB
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.redirect(new URL(`/admin/realizace/${encodeURIComponent(id)}?err=toolarge`, req.url), 303);
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = (() => {
      const t = file.type || "";
      if (t === "image/png") return "png";
      if (t === "image/webp") return "webp";
      return "jpg";
    })();

    const filename = `${id}.${ext}`;
    const publicImageUrl = `/uploads/realizace/${filename}`;

    // local write (jen lokálně; na Vercelu je filesystem read-only)
    if (!process.env.VERCEL) {
      const uploadsDir = path.resolve(process.cwd(), "public/uploads/realizace");
      fs.mkdirSync(uploadsDir, { recursive: true });
      fs.writeFileSync(path.join(uploadsDir, filename), bytes);
    }

    // if old image was also an upload but with different ext/path, delete it in GH
    if (existing.imageUrl.startsWith("/uploads/realizace/") && existing.imageUrl !== publicImageUrl) {
      oldImageRepoPathToDelete = `public${existing.imageUrl}`;
    }

    next.imageUrl = publicImageUrl;
    newImageBytes = bytes;
    newImageRepoPath = `public/uploads/realizace/${filename}`;
  }

  // local upsert (jen lokálně; na Vercelu je filesystem read-only)
  if (!process.env.VERCEL) {
    upsertRealizaceLocal(next);
  }

  // prod upsert via GitHub
  try {
    const ghToken = getRequiredEnv("PI_GITHUB_TOKEN");
    const owner = getRequiredEnv("PI_GITHUB_OWNER");
    const repo = getRequiredEnv("PI_GITHUB_REPO");
    const branch = getRequiredEnv("PI_GITHUB_BRANCH");

    // update JSON
    const all = listRealizace({ includeUnpublished: true });
    const merged = [next, ...all.filter((x) => x.id !== id)];
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
      message: `Update realizace: ${id}`,
    });

    // delete old image if needed
    if (oldImageRepoPathToDelete) {
      const oldSha = await githubGetFileSha({ token: ghToken, owner, repo, branch, path: oldImageRepoPathToDelete });
      await githubDeleteFile({
        token: ghToken,
        owner,
        repo,
        branch,
        path: oldImageRepoPathToDelete,
        sha: oldSha,
        message: `Delete old realizace image: ${id}`,
      });
    }

    // write new image if provided
    if (newImageBytes && newImageRepoPath) {
      let imageSha: string | undefined = undefined;
      try {
        imageSha = await githubGetFileSha({ token: ghToken, owner, repo, branch, path: newImageRepoPath });
      } catch {
        // new file
      }

      await githubWriteFile({
        token: ghToken,
        owner,
        repo,
        branch,
        path: newImageRepoPath,
        sha: imageSha,
        contentBase64: newImageBytes.toString("base64"),
        message: `Update realizace image: ${id}`,
      });
    }
  } catch {
    // ignore
  }

  return NextResponse.redirect(new URL("/admin/realizace", req.url), 303);
}
