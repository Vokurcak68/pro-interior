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
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
            ADMIN / REALIZACE
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Realizace</h1>
        </div>
        <Link
          href="/admin/realizace/nova"
          className="rounded-full px-4 py-2 text-sm font-medium text-white"
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{it.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{it.published ? "Publikováno" : "Neveřejné"}</div>
                </div>
                {it.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.imageUrl} alt="" className="h-16 w-24 rounded-xl object-cover border" style={{ borderColor: "var(--line)" }} />
                ) : null}
              </div>
              <div className="mt-3 text-sm text-slate-600 line-clamp-3">{it.description}</div>
              <div className="mt-3 text-xs text-slate-500">ID: {it.id}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
