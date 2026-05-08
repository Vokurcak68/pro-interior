import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";
import { listRealizace } from "@/lib/realizaceStore";

export default async function AdminRealizaceList() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) redirect("/admin/prihlaseni");

  const items = listRealizace({ includeUnpublished: true });

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
            ADMIN / REALIZACE
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Realizace</h1>
        </div>
        <Link
          href="/admin/realizace/nova"
          className="rounded-full px-4 py-3 text-sm font-medium text-white text-center w-full sm:w-auto"
          style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
        >
          + Nová realizace
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border p-6 text-sm text-slate-600" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
            Zatím tu není žádná realizace.
          </div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="rounded-2xl border p-5" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">{it.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{it.published ? "Publikováno" : "Neveřejné"}</div>
                </div>
                <div
                  className="h-16 w-full sm:w-24 rounded-xl border bg-center bg-cover"
                  style={{
                    borderColor: "var(--line)",
                    backgroundImage: it.imageUrl
                      ? `url(${it.imageUrl})`
                      : `url(/realizace/hero-1.jpg), linear-gradient(135deg, rgba(249,115,22,.10), rgba(245,158,11,.06))`,
                  }}
                  aria-label={it.title}
                />
              </div>
              <div className="mt-3 text-sm text-slate-600 line-clamp-3">{it.description}</div>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div className="text-xs text-slate-500">ID: {it.id}</div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Link
                    href={`/admin/realizace/${it.id}`}
                    className="rounded-full px-4 py-3 text-xs font-semibold border text-center w-full sm:w-auto"
                    style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.6)" }}
                  >
                    Upravit
                  </Link>
                  <form action="/admin/api/realizace/delete" method="post">
                    <input type="hidden" name="id" value={it.id} />
                    <button
                      type="submit"
                      className="rounded-full px-4 py-3 text-xs font-semibold border text-center w-full sm:w-auto"
                      style={{ borderColor: "rgba(239,68,68,.35)", background: "rgba(239,68,68,.08)", color: "#991b1b" }}
                    >
                      Smazat
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
