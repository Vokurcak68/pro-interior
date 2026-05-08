import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";
import { getRealizaceById } from "@/lib/realizaceStore";

export default async function AdminRealizaceEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ err?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) redirect("/admin/prihlaseni");

  const { id } = await params;
  const sp = (await searchParams) || {};
  const err = sp.err === "1";

  const item = getRealizaceById(id);
  if (!item) redirect("/admin/realizace?err=notfound");

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
            ADMIN / REALIZACE
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Upravit realizaci</h1>
          <div className="mt-2 text-xs text-slate-500">ID: {item.id}</div>
        </div>
        <Link
          href="/admin/realizace"
          className="text-sm hover:underline self-start sm:self-auto"
          style={{ color: "var(--wood)" }}
        >
          ← Zpět
        </Link>
      </div>

      {err ? (
        <div className="mt-6 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(239,68,68,.35)", background: "rgba(239,68,68,.08)", color: "#991b1b" }}>
          Vyplň prosím název a popis.
        </div>
      ) : null}

      <form
        className="mt-6 grid gap-4 rounded-2xl border p-4 sm:p-6"
        style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        action="/admin/api/realizace/update"
        method="post"
        encType="multipart/form-data"
      >
        <input type="hidden" name="id" value={item.id} />

        <label className="grid gap-2">
          <div className="text-sm font-medium text-slate-900">Název</div>
          <input
            name="title"
            defaultValue={item.title}
            className="w-full min-w-0 rounded-xl border px-4 py-3 text-sm"
            style={{ borderColor: "var(--line)", background: "white" }}
            required
          />
        </label>

        <label className="grid gap-2">
          <div className="text-sm font-medium text-slate-900">Popis</div>
          <textarea
            name="description"
            defaultValue={item.description}
            rows={6}
            className="w-full min-w-0 rounded-xl border px-4 py-3 text-sm"
            style={{ borderColor: "var(--line)", background: "white" }}
            required
          />
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" name="published" value="1" defaultChecked={item.published} />
          <span className="text-sm text-slate-700">Publikovat</span>
        </label>

        <div className="grid gap-2">
          <div className="text-sm font-medium text-slate-900">Fotka (volitelné)</div>
          <input type="file" name="image" accept="image/*" className="block w-full max-w-full" />
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt=""
              className="mt-2 h-64 sm:h-72 w-full max-w-full rounded-2xl object-contain border"
              style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.7)" }}
            />
          ) : null}
          <div className="text-xs text-slate-500">Když vybereš novou fotku, přepíše se.</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="rounded-full px-5 py-3 text-sm font-medium text-white w-full sm:w-auto"
            style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
          >
            Uložit změny
          </button>
          <Link
            href="/admin/realizace"
            className="rounded-full px-5 py-3 text-sm font-medium border text-center w-full sm:w-auto"
            style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.7)" }}
          >
            Zrušit
          </Link>
        </div>
      </form>
    </div>
  );
}
