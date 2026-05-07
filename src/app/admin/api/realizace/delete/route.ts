import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";
import { deleteRealizaceLocal, listRealizace, REALIZACE_JSON_PATH } from "@/lib/realizaceStore";
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
  if (!id) {
    return NextResponse.redirect(new URL("/admin/realizace?err=1", req.url), 303);
  }

  // local delete (dev)
  const { deleted } = deleteRealizaceLocal(id);

  // prod delete via GitHub (json + image)
  try {
    const ghToken = getRequiredEnv("PI_GITHUB_TOKEN");
    const owner = getRequiredEnv("PI_GITHUB_OWNER");
    const repo = getRequiredEnv("PI_GITHUB_REPO");
    const branch = getRequiredEnv("PI_GITHUB_BRANCH");

    // update JSON
    const existing = listRealizace({ includeUnpublished: true });
    const next = existing.filter((x) => x.id !== id);
    const json = JSON.stringify(next, null, 2) + "\n";

    const sha = await githubGetFileSha({ token: ghToken, owner, repo, branch, path: REALIZACE_JSON_PATH });
    await githubWriteFile({
      token: ghToken,
      owner,
      repo,
      branch,
      path: REALIZACE_JSON_PATH,
      sha,
      contentBase64: Buffer.from(json, "utf8").toString("base64"),
      message: `Delete realizace: ${id}`,
    });

    // delete image if it's in uploads and we know its path
    const imageUrl = deleted?.imageUrl || "";
    if (imageUrl.startsWith("/uploads/realizace/")) {
      const imageRepoPath = `public${imageUrl}`;
      const imageSha = await githubGetFileSha({ token: ghToken, owner, repo, branch, path: imageRepoPath });
      await githubDeleteFile({
        token: ghToken,
        owner,
        repo,
        branch,
        path: imageRepoPath,
        sha: imageSha,
        message: `Delete realizace image: ${id}`,
      });
    }
  } catch {
    // ignore
  }

  return NextResponse.redirect(new URL("/admin/realizace", req.url), 303);
}
