import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";

export default async function AdminRealizaceList() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) redirect("/admin/prihlaseni");

  // TODO: load from Supabase (pi_realizace)
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

      <div className="mt-6 rounded-2xl border p-6 text-sm text-slate-600" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
        Zatím je hotový přihlášení a routing adminu. V dalším kroku se napojí Supabase tabulka + upload fotek.
      </div>
    </div>
  );
}
