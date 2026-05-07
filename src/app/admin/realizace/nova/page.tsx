import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";

export default async function AdminNovaRealizace() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) redirect("/admin/prihlaseni");

  return (
    <div className="container py-10">
      <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
        ADMIN / REALIZACE
      </div>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Nová realizace</h1>

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

        <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <div className="text-sm font-medium text-slate-900">Fotka</div>
          <input name="image" type="file" accept="image/*" className="mt-2 block w-full text-sm" required />
          <div className="mt-2 text-xs text-slate-600">Zatím 1 fotka na realizaci.</div>
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
