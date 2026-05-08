import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";

export default async function AdminNovaRealizace({
  searchParams,
}: {
  searchParams?: Promise<{ err?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) redirect("/admin/prihlaseni");

  const sp = (await searchParams) || {};
  const err = sp.err || "";

  return (
    <div className="container py-10">
      <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
        ADMIN / REALIZACE
      </div>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Nová realizace</h1>

      {err === "toolarge" ? (
        <div
          className="mt-6 rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "rgba(239,68,68,.35)", background: "rgba(239,68,68,.08)", color: "#991b1b" }}
        >
          Fotka je moc velká (payload too large). Zkus ji prosím zmenšit / poslat v menší kvalitě (ideálně do ~4&nbsp;MB).
        </div>
      ) : err === "1" ? (
        <div
          className="mt-6 rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "rgba(239,68,68,.35)", background: "rgba(239,68,68,.08)", color: "#991b1b" }}
        >
          Vyplň prosím všechna pole a vyber fotku.
        </div>
      ) : null}

      <form
        className="mt-6 grid gap-4 max-w-xl"
        action="/admin/api/realizace/create"
        method="post"
        encType="multipart/form-data"
      >
        <input
          name="title"
          placeholder="Název"
          className="w-full rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "var(--line)", background: "white" }}
          required
        />

        <textarea
          name="description"
          placeholder="Popis"
          rows={6}
          className="w-full rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "var(--line)", background: "white" }}
          required
        />

        <div className="grid gap-4 rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-slate-900">Kategorie</div>
            <input
              name="category"
              placeholder="Např. Kuchyně / Vestavby / Nábytek"
              className="w-full rounded-xl border px-4 py-3 text-sm"
              style={{ borderColor: "var(--line)", background: "white" }}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium text-slate-900">Lokalita</div>
            <input
              name="location"
              placeholder="Např. Praha a okolí"
              className="w-full rounded-xl border px-4 py-3 text-sm"
              style={{ borderColor: "var(--line)", background: "white" }}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium text-slate-900">Rok</div>
            <input
              name="year"
              type="number"
              inputMode="numeric"
              min={2000}
              max={2100}
              placeholder="2026"
              className="w-full rounded-xl border px-4 py-3 text-sm"
              style={{ borderColor: "var(--line)", background: "white" }}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium text-slate-900">Fotka</div>
            <input name="image" type="file" accept="image/*" className="block w-full text-sm" required />
            <div className="text-xs text-slate-600">Zatím 1 fotka na realizaci.</div>
          </div>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="published" value="1" defaultChecked />
          Publikovat
        </label>

        <button
          type="submit"
          className="rounded-full px-5 py-3 text-sm font-medium text-white"
          style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
        >
          Uložit realizaci
        </button>
      </form>
    </div>
  );
}
